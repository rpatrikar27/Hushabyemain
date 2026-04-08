'use client';

import { useState } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Save,
  Mail,
  Lock
} from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="max-w-4xl space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-900">General Settings</h3>
          <p className="text-sm text-slate-500">Manage your store information and global preferences.</p>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Store Name</label>
              <input 
                type="text" 
                defaultValue="Hushabye Baby Care"
                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Support Email</label>
              <input 
                type="email" 
                defaultValue="support@hushabye.in"
                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex justify-end">
              <button className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-105">
                <Save className="h-4 w-4" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-slate-200" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-900">Security</h3>
          <p className="text-sm text-slate-500">Update your password and manage account security.</p>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Two-Factor Authentication</p>
                  <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
                </div>
              </div>
              <button className="rounded-lg bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors">Enable</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
