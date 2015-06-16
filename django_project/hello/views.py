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

def mainframe(request):
    context = RequestContext(request)
    context_dict = {}
    return render_to_response('mainframe.html', context_dict, context)

def handler404(request):
    response = render_to_response('404.html', {},
                                  context_instance=RequestContext(request))
    response.status_code = 404
    return response


def handler500(request):
    response = render_to_response('500.html', {},
                                  context_instance=RequestContext(request))
    response.status_code = 500
    return response