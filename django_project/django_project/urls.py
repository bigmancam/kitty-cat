from django.conf.urls import patterns, include, url
from hello import views
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'django_project.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^$', views.index, name='index'),
    url(r'^page2/', views.detail_page, name='page2'),
    url(r'^mainframe/', views.mainframe, name='mainframe'),
    url(r'^admin/', include(admin.site.urls)),
)
