import React from 'react';
import { Check, Shield, Fingerprint, Lock, User, CreditCard, GraduationCap, FileText, QrCode, Copy, AlertCircle, Phone } from 'lucide-react';

interface DeviceMockupProps {
  screen: 'profile' | 'add-document' | 'share' | 'unlock' | 'emergency';
  className?: string;
}

const DeviceMockup: React.FC<DeviceMockupProps> = ({ screen, className = '' }) => {
  const renderScreen = () => {
    switch (screen) {
      case 'profile':
        return <ProfileScreen />;
      case 'add-document':
        return <AddDocumentScreen />;
      case 'share':
        return <ShareScreen />;
      case 'unlock':
        return <UnlockScreen />;
      case 'emergency':
        return <EmergencyScreen />;
      default:
        return <ProfileScreen />;
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Device Frame */}
      <div className="relative bg-vaulta-dark rounded-[28px] p-2 border border-white/10 shadow-device">
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-vaulta-dark rounded-full z-10" />
        
        {/* Screen */}
        <div className="relative bg-vaulta-dark rounded-[22px] overflow-hidden w-[280px] sm:w-[320px] md:w-[360px] h-[560px] sm:h-[640px] md:h-[720px]">
          {renderScreen()}
        </div>
      </div>
    </div>
  );
};

const ProfileScreen = () => (
  <div className="h-full bg-vaulta-dark flex flex-col">
    {/* Header */}
    <div className="pt-12 pb-4 px-5 border-b border-white/5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-vaulta-muted text-xs font-mono uppercase tracking-wider">Identity Profile</p>
          <h3 className="text-vaulta-text font-sora font-semibold text-lg mt-1">John Doe</h3>
        </div>
        <div className="w-12 h-12 rounded-full bg-vaulta-teal/20 flex items-center justify-center">
          <User className="w-6 h-6 text-vaulta-teal" />
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <Shield className="w-4 h-4 text-vaulta-teal" />
        <span className="text-vaulta-teal text-xs font-medium">Verified</span>
      </div>
    </div>
    
    {/* Documents List */}
    <div className="flex-1 px-5 py-4 overflow-auto">
      <p className="text-vaulta-muted text-xs font-mono uppercase tracking-wider mb-3">Your Documents</p>
      
      <DocumentItem 
        icon={<CreditCard className="w-5 h-5" />}
        title="NIN Slip"
        subtitle="National Identity Number"
        status="Available offline"
      />
      
      <DocumentItem 
        icon={<FileText className="w-5 h-5" />}
        title="Voter Card"
        subtitle="Permanent Voter Card"
        status="Available offline"
      />
      
      <DocumentItem 
        icon={<CreditCard className="w-5 h-5" />}
        title="Driver's License"
        subtitle="Federal Road Safety"
        status="Available offline"
      />
      
      <DocumentItem 
        icon={<FileText className="w-5 h-5" />}
        title="Birth Certificate"
        subtitle="National Population Commission"
        status="Available offline"
      />
      
      <DocumentItem 
        icon={<GraduationCap className="w-5 h-5" />}
        title="Academic Certificate"
        subtitle="Bachelor's Degree"
        status="Available offline"
      />
    </div>
    
    {/* Bottom Action */}
    <div className="p-5 border-t border-white/5">
      <button className="w-full py-3 bg-vaulta-teal/20 rounded-xl flex items-center justify-center gap-2 text-vaulta-teal font-medium text-sm hover:bg-vaulta-teal/30 transition-colors">
        <QrCode className="w-5 h-5" />
        Share Identity
      </button>
    </div>
  </div>
);

const DocumentItem = ({ icon, title, subtitle, status }: { icon: React.ReactNode, title: string, subtitle: string, status: string }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 mb-2 hover:bg-white/[0.05] transition-colors cursor-pointer">
    <div className="w-10 h-10 rounded-lg bg-vaulta-teal/10 flex items-center justify-center text-vaulta-teal">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-vaulta-text font-medium text-sm truncate">{title}</p>
      <p className="text-vaulta-muted text-xs truncate">{subtitle}</p>
    </div>
    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-vaulta-teal/10">
      <Check className="w-3 h-3 text-vaulta-teal" />
      <span className="text-vaulta-teal text-[10px] font-medium">{status}</span>
    </div>
  </div>
);

const AddDocumentScreen = () => (
  <div className="h-full bg-vaulta-dark flex flex-col">
    {/* Header */}
    <div className="pt-12 pb-4 px-5">
      <p className="text-vaulta-muted text-xs font-mono uppercase tracking-wider">Add Document</p>
      <h3 className="text-vaulta-text font-sora font-semibold text-lg mt-1">Scan or Upload</h3>
    </div>
    
    {/* Camera Preview Area */}
    <div className="mx-5 aspect-[4/3] rounded-2xl bg-vaulta-dark border-2 border-dashed border-vaulta-teal/30 flex flex-col items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-vaulta-teal/10 flex items-center justify-center mb-3">
        <div className="w-8 h-8 rounded-full border-2 border-vaulta-teal" />
      </div>
      <p className="text-vaulta-muted text-sm">Position document in frame</p>
    </div>
    
    {/* Document Types */}
    <div className="flex-1 px-5 py-4">
      <p className="text-vaulta-muted text-xs font-mono uppercase tracking-wider mb-3">Select Type</p>
      
      <div className="flex flex-wrap gap-2">
        {['NIN Slip', 'Voter Card', 'Driver License', 'Birth Cert', 'Academic', 'Other'].map((type) => (
          <button 
            key={type}
            className="px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 text-vaulta-text text-sm hover:bg-vaulta-teal/20 hover:border-vaulta-teal/30 transition-colors"
          >
            {type}
          </button>
        ))}
      </div>
    </div>
    
    {/* Bottom Actions */}
    <div className="p-5 border-t border-white/5 space-y-2">
      <button className="w-full py-3 bg-vaulta-teal rounded-xl text-white font-medium text-sm hover:bg-vaulta-teal/90 transition-colors">
        Take Photo
      </button>
      <button className="w-full py-3 bg-white/[0.05] rounded-xl text-vaulta-text font-medium text-sm hover:bg-white/[0.08] transition-colors">
        Upload from Gallery
      </button>
    </div>
  </div>
);

const ShareScreen = () => (
  <div className="h-full bg-vaulta-dark flex flex-col">
    {/* Header */}
    <div className="pt-12 pb-4 px-5 border-b border-white/5">
      <p className="text-vaulta-muted text-xs font-mono uppercase tracking-wider">Share Document</p>
      <h3 className="text-vaulta-text font-sora font-semibold text-lg mt-1">NIN Slip</h3>
    </div>
    
    {/* QR Code */}
    <div className="flex-1 flex flex-col items-center justify-center px-5">
      <div className="w-48 h-48 rounded-2xl bg-white p-4 mb-4">
        <div className="w-full h-full bg-vaulta-dark rounded-lg flex items-center justify-center">
          <QrCode className="w-32 h-32 text-vaulta-text" />
        </div>
      </div>
      
      <p className="text-vaulta-muted text-sm text-center mb-4">
        Scan to verify identity
      </p>
      
      {/* One-time Code */}
      <div className="w-full p-4 rounded-xl bg-white/[0.03] border border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-vaulta-muted text-xs mb-1">One-time Code</p>
            <p className="text-vaulta-text font-mono text-xl tracking-wider">8472-3910</p>
          </div>
          <button className="p-2 rounded-lg bg-vaulta-teal/20 text-vaulta-teal hover:bg-vaulta-teal/30 transition-colors">
            <Copy className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
    
    {/* Bottom Info */}
    <div className="p-5 border-t border-white/5">
      <div className="flex items-center gap-2 text-vaulta-muted text-xs">
        <Lock className="w-4 h-4" />
        <span>Expires in 10 minutes • Read-only access</span>
      </div>
    </div>
  </div>
);

const UnlockScreen = () => (
  <div className="h-full bg-vaulta-dark flex flex-col items-center justify-center px-8">
    {/* Fingerprint Icon */}
    <div className="w-24 h-24 rounded-full bg-vaulta-teal/10 flex items-center justify-center mb-6 animate-pulse-soft">
      <Fingerprint className="w-12 h-12 text-vaulta-teal" />
    </div>
    
    <h3 className="text-vaulta-text font-sora font-semibold text-xl mb-2">Unlock VAULTA</h3>
    <p className="text-vaulta-muted text-sm text-center mb-8">
      Use fingerprint or enter PIN
    </p>
    
    {/* PIN Dots */}
    <div className="flex gap-3 mb-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="w-4 h-4 rounded-full bg-vaulta-teal" />
      ))}
    </div>
    
    {/* Numpad */}
    <div className="grid grid-cols-3 gap-4 w-full max-w-[240px]">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'].map((num, i) => (
        <button 
          key={i}
          className="aspect-square rounded-xl bg-white/[0.05] flex items-center justify-center text-vaulta-text text-xl font-medium hover:bg-white/[0.08] transition-colors"
        >
          {num === 'del' ? '⌫' : num}
        </button>
      ))}
    </div>
    
    <button className="mt-6 text-vaulta-teal text-sm font-medium">
      Use PIN instead
    </button>
  </div>
);

const EmergencyScreen = () => (
  <div className="h-full bg-vaulta-dark flex flex-col">
    {/* Emergency Header */}
    <div className="pt-12 pb-4 px-5 bg-red-500/10 border-b border-red-500/20">
      <div className="flex items-center gap-2 mb-2">
        <AlertCircle className="w-5 h-5 text-red-400" />
        <span className="text-red-400 text-xs font-mono uppercase tracking-wider">Emergency ID</span>
      </div>
      <h3 className="text-vaulta-text font-sora font-semibold text-lg">Accessible without unlock</h3>
    </div>
    
    {/* Emergency Info */}
    <div className="flex-1 px-5 py-4">
      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 mb-3">
        <p className="text-vaulta-muted text-xs font-mono uppercase tracking-wider mb-1">Full Name</p>
        <p className="text-vaulta-text font-medium">John Chukwuemeka Doe</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
          <p className="text-vaulta-muted text-xs font-mono uppercase tracking-wider mb-1">Blood Type</p>
          <p className="text-vaulta-text font-medium text-xl">O+</p>
        </div>
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
          <p className="text-vaulta-muted text-xs font-mono uppercase tracking-wider mb-1">Allergies</p>
          <p className="text-vaulta-text font-medium">Penicillin</p>
        </div>
      </div>
      
      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
        <p className="text-vaulta-muted text-xs font-mono uppercase tracking-wider mb-2">Emergency Contact</p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-vaulta-teal/20 flex items-center justify-center">
            <Phone className="w-5 h-5 text-vaulta-teal" />
          </div>
          <div>
            <p className="text-vaulta-text font-medium">Sarah Doe</p>
            <p className="text-vaulta-muted text-sm">+234 801 234 5678</p>
          </div>
        </div>
      </div>
    </div>
    
    {/* Bottom Note */}
    <div className="p-5 border-t border-white/5">
      <p className="text-vaulta-muted text-xs text-center">
        This information is visible to first responders even when your phone is locked
      </p>
    </div>
  </div>
);

export default DeviceMockup;
