"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Shield, LogIn, LogOut } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';

export default function AdminLogin() {
  const { isAdmin, loginAsAdmin, logoutAdmin } = useAdmin();
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleLogin = () => {
    if (loginAsAdmin(password)) {
      toast({
        title: "Admin Login Successful",
        description: "You now have admin access.",
      });
      setIsOpen(false);
      setPassword('');
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid admin password.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    toast({
      title: "Logged Out",
      description: "You are now logged out as admin.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="px-5 py-2 rounded-xl bg-gray-900 text-white font-semibold transition-colors duration-200 hover:bg-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800"
        >
          Log in
        </Button>
      </DialogTrigger>
      
      {!isAdmin && (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Admin Login
            </DialogTitle>
            <CardDescription>
              Enter admin password to access admin features
            </CardDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-password">Admin Password</Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleLogin}
                className="flex-1"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
              <Button 
                onClick={() => setIsOpen(false)}
                className="flex-1 border border-gray-600 bg-transparent text-white hover:bg-gray-800"
              >
                Cancel
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground text-center">
              Default password: admin123
            </div>
          </div>
        </DialogContent>
      )}
      
      {isAdmin && (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Admin Logout
            </DialogTitle>
            <CardDescription>
              Are you sure you want to logout as admin?
            </CardDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You will lose access to admin features like QR code generation.
            </p>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleLogout}
                className="flex-1 bg-red-600 text-white hover:bg-red-700"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
              <Button 
                onClick={() => setIsOpen(false)}
                className="flex-1 border border-gray-600 bg-transparent text-white hover:bg-gray-800"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
} 