'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    if (!formData.email.trim()) {
      toast.error('Please enter your email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!formData.subject.trim()) {
      toast.error('Please enter a subject');
      return;
    }

    if (!formData.message.trim()) {
      toast.error('Please enter your message');
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          phone: '',
        });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full relative min-h-screen overflow-hidden">
      <Image src={'/hero1.gif'} alt="Hero" width={1000} height={1000} className='w-full h-full object-cover absolute inset-0' />
      <div className="relative py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-5xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-bold text-5xl font-game text-white mb-2">Contact</h1>
            <h2 className="font-bold text-7xl font-game text-yellow-400 mb-6"
            style={{
              textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0px 2px 0 #000, 2px 0px 0 #000, 0px -2px 0 #000, -2px 0px 0 #000',
            }}>Us</h2>
            <p className="text-lg text-slate-100 font-game">
              Have questions or feedback? We'd love to hear from you!
            </p>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="md:col-span-1">
            <div className="space-y-6">
              {/* Email Card */}
              <Card className="border-4 border-yellow-400 bg-slate-900/70 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-yellow-400 p-3">
                      <Mail className="h-6 w-6 text-slate-900" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-yellow-400 font-game mb-1">Email</h3>
                      <p className="text-sm text-slate-200">support@codemon.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Phone Card */}
              <Card className="border-4 border-yellow-400 bg-slate-900/70 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-yellow-400 p-3">
                      <Phone className="h-6 w-6 text-slate-900" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-yellow-400 font-game mb-1">Phone</h3>
                      <p className="text-sm text-slate-200">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Address Card */}
              <Card className="border-4 border-yellow-400 bg-slate-900/70 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-yellow-400 p-3">
                      <MapPin className="h-6 w-6 text-slate-900" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-yellow-400 font-game mb-1">Address</h3>
                      <p className="text-sm text-slate-200">
                        BIT Mesra
                        <br />
                        Jharkhand, India
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <Card className="border-4 border-yellow-400 bg-slate-900/70 shadow-lg">
              <CardHeader>
                <CardTitle className="text-yellow-400 font-game text-3xl">Send us a Message</CardTitle>
                <CardDescription className="text-slate-300 font-game">
                  Fill out the form below and we'll respond within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-yellow-400 font-game">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="h-10 border-2 border-yellow-400 bg-slate-800 text-white placeholder-slate-400"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-yellow-400 font-game">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="h-10 border-2 border-yellow-400 bg-slate-800 text-white placeholder-slate-400"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-yellow-400 font-game">
                      Phone Number (Optional)
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="h-10 border-2 border-yellow-400 bg-slate-800 text-white placeholder-slate-400"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-medium text-yellow-400 font-game">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="h-10 border-2 border-yellow-400 bg-slate-800 text-white placeholder-slate-400"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium text-yellow-400 font-game">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="resize-none border-2 border-yellow-400 bg-slate-800 text-white placeholder-slate-400"
                      rows={5}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    variant={'pixel'}
                    className="w-full h-10 text-lg font-game"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
