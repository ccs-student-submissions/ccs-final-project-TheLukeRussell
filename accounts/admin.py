from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User, UserProfile, Instrument, Connection, BandProfile, Member

admin.site.register(User, UserAdmin)
admin.site.register(UserProfile)
admin.site.register(BandProfile)
admin.site.register(Instrument)
admin.site.register(Connection)
admin.site.register(Member)