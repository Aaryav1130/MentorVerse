"use client";

import { BadgeCheck, Star, Clock, Bell, IndianRupee, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { mentorProfile } from "@/lib/mock-data";

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Profile & Settings</h1>
        <p className="text-slate-400">Manage your profile, expertise and preferences.</p>
      </div>

      {/* Main Profile Card */}
      <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-8 flex flex-col md:flex-row gap-8 items-start">
        <div className="w-32 h-32 rounded-full bg-cardrand-accent flex-shrink-0 flex items-center justify-center text-white font-bold text-4xl shadow-xl border-4 border-[#0a0e1a]">
          {mentorProfile.initials}
        </div>
        
        <div className="flex-1 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                {mentorProfile.name}
                <BadgeCheck className="w-6 h-6 text-blue-500" />
              </h2>
              <p className="text-brand-accent font-medium">{mentorProfile.title}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-brand-accent fill-amber-500" />
                  {mentorProfile.rating} ({mentorProfile.reviews} reviews)
                </span>
                <span>•</span>
                <span>{mentorProfile.experience}</span>
              </div>
            </div>
            <button className="px-5 py-2 bg-white text-black font-semibold rounded-lg hover:bg-slate-200 transition-colors">
              Edit Profile
            </button>
          </div>

          <div className="pt-4 border-t border-[#1e293b]">
            <h3 className="text-white font-medium mb-2">About Me</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {mentorProfile.bio}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          
          {/* Expertise Section */}
          <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {mentorProfile.expertise.map((skill) => (
                <span 
                  key={skill} 
                  className="px-3 py-1.5 bg-[#0a0e1a] border border-[#1e293b] rounded-full text-sm text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Session Settings */}
          <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] p-6 space-y-6">
            <h3 className="text-lg font-semibold text-white mb-2">Session Settings</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-white font-medium">Availability</p>
                    <p className="text-sm text-slate-400 mt-1">{mentorProfile.availability}</p>
                  </div>
                </div>
                <button className="text-blue-500 text-sm hover:underline">Edit</button>
              </div>

              <div className="w-full h-px bg-[#1e293b]" />

              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <IndianRupee className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-white font-medium">1:1 Session Pricing</p>
                    <p className="text-sm text-slate-400 mt-1">{formatCurrency(mentorProfile.pricing.oneOnOne)} / hour</p>
                  </div>
                </div>
                <button className="text-blue-500 text-sm hover:underline">Edit</button>
              </div>

              <div className="flex justify-between items-start">
                <div className="flex gap-3 ml-8">
                  <div>
                    <p className="text-white font-medium">Group Session Pricing</p>
                    <p className="text-sm text-slate-400 mt-1">{formatCurrency(mentorProfile.pricing.group)} / student</p>
                  </div>
                </div>
                <button className="text-blue-500 text-sm hover:underline">Edit</button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column - Quick Settings */}
        <div className="bg-[#141b2d] rounded-xl border border-[#1e293b] overflow-hidden flex flex-col h-full">
          <div className="p-6 border-borderorder border-[#1e293b]">
            <h3 className="text-lg font-semibold text-white">Quick Settings</h3>
          </div>
          
          <div className="flex-1 divide-y divide-[#1e293b]">
            {[
              { icon: Bell, label: "Notifications", desc: "Manage email and push alerts" },
              { icon: IndianRupee, label: "Payment Methods", desc: "Manage payout details" },
              { icon: Shield, label: "Change Password", desc: "Update your security credentials" },
              { icon: HelpCircle, label: "Help & Support", desc: "Get help with your account" },
            ].map((setting, idx) => (
              <button key={idx} className="w-full p-6 flex items-center justify-between hover:bg-[#0a0e1a]/50 transition-colors text-left group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0a0e1a] border border-[#1e293b] flex items-center justify-center text-slate-400 group-hover:text-brand-accent group-hover:border-amber-400/30 transition-colors">
                    <setting.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{setting.label}</p>
                    <p className="text-sm text-slate-500 mt-0.5">{setting.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
              </button>
            ))}
          </div>

          <div className="p-6 bg-[#0a0e1a]/50 border-t border-[#1e293b]">
            <button className="flex items-center gap-2 text-red-500 hover:text-red-400 font-medium transition-colors">
              <LogOut className="w-5 h-5" />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
