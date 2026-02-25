import { Phone, MessageCircle, MapPin, Mail, Clock } from 'lucide-react';
import { PHONE_NUMBER, WHATSAPP_NUMBER, getWhatsAppLink } from '../data/services';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
          <p className="text-gray-500 text-sm">We're here to help. Reach out via WhatsApp, call, or email.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Contact Cards */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 flex items-center gap-4 hover:border-brand-blue/30 hover:shadow-card-hover transition-all group"
          >
            <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center group-hover:bg-brand-blue transition-colors">
              <Phone size={22} className="text-brand-blue group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Call / WhatsApp</p>
              <p className="font-bold text-gray-900 text-lg">{PHONE_NUMBER}</p>
              <p className="text-xs text-gray-400">Available 8 AM – 8 PM</p>
            </div>
          </a>

          <a
            href={getWhatsAppLink('Hello TrustFix! I need home services.')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 flex items-center gap-4 hover:border-green-300 hover:shadow-card-hover transition-all group"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-500 transition-colors">
              <MessageCircle size={22} className="text-green-600 group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">WhatsApp</p>
              <p className="font-bold text-gray-900 text-lg">{PHONE_NUMBER}</p>
              <p className="text-xs text-gray-400">Chat with us instantly</p>
            </div>
          </a>

          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <MapPin size={22} className="text-red-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Address</p>
              <p className="font-semibold text-gray-900 text-sm">12th Cross, Mookambika Nagar</p>
              <p className="text-xs text-gray-400">Bangalore, Karnataka</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <Mail size={22} className="text-purple-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Email</p>
              <p className="font-semibold text-gray-900 text-sm">htrustfix@gmail.com</p>
              <p className="text-xs text-gray-400">We reply within 24 hours</p>
            </div>
          </div>
        </div>

        {/* Hours */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Clock size={20} className="text-brand-blue" />
            <h2 className="font-bold text-gray-900">Working Hours</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { day: 'Monday – Friday', hours: '8:00 AM – 8:00 PM' },
              { day: 'Saturday', hours: '8:00 AM – 6:00 PM' },
              { day: 'Sunday', hours: '9:00 AM – 5:00 PM' },
              { day: 'Emergency', hours: 'Available 24/7' },
            ].map((item) => (
              <div key={item.day} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <span className="text-gray-600">{item.day}</span>
                <span className="font-medium text-gray-900">{item.hours}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-brand-blue rounded-2xl p-6 text-center text-white">
          <h2 className="font-bold text-xl mb-2">Need Immediate Help?</h2>
          <p className="text-white/80 text-sm mb-4">Our team is ready to assist you right now</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={getWhatsAppLink('Hello TrustFix! I need urgent home service assistance.')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-brand-blue font-bold px-6 py-3 rounded-full hover:bg-yellow-300 transition-colors text-sm"
            >
              💬 WhatsApp Now
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white font-bold px-6 py-3 rounded-full hover:bg-white hover:text-brand-blue transition-colors text-sm"
            >
              📞 Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
