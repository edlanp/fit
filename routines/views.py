from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
#import models, forms
from .models import Routine,Workout,Excercise
from .forms import RoutineForm


# Create your views here.

def index(request):
	routines = Routine.objects.all()
	context = {'routines' : routines}
	return render(request, 'routines/index.html', context)

def routine(request,routine_id):
	routine = Routine.objects.get(id=routine_id)
	workouts = Workout.objects.filter(routine__id=routine_id).order_by('day')
	excercises = Excercise.objects.filter(workout__routine__id=routine.id)
	#create a workout dict (to be used in the template)
	wo_dict = {}
	ex_dict = {}
	for d in range(0,routine.num_days):
		wo = list(workouts.filter(day=d).values('name'))
		if(wo != []):
			wo_dict[d] = wo 
	for d in wo_dict:
		ex = list(excercises.filter(workout__day = d).order_by('order').order_by('workout__id'))
		if(ex != []):
			ex_dict[d] = ex
	context = {'routine':routine, 'workouts':workouts, 'wo_dict':wo_dict, 'ex_dict':ex_dict}
	return render(request,'routines/routine.html', context)

def new_routine(request):
	if request.method != 'POST':
		form = RoutineForm()
	else:
		form = TopicForm(request.POST)
		if form.is_valid():
			form.save()
			return HttoResponseRedirect(reverse('routines:index'))
	context = {'form':form}
	return render(request,'routines/new_routine.html', context)
