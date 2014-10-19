from django.shortcuts import render
from django.template import RequestContext
from django.shortcuts import render_to_response
# Create your views here.

def index(request):
	context = RequestContext(request)
	context_dict = {'title': "Welcome to the Home Page!"}
	return render_to_response('index.html', context_dict, context)

def detail_page(request):
	context = RequestContext(request)
	context_dict = {}
	return render_to_response('detail_page.html', context_dict, context)
