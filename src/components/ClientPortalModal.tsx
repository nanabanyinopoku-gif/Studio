import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  Download,
  Calendar,
  UserCheck,
  FileCheck2,
  AlertCircle,
  BarChart3,
  Layers,
  Sparkles,
  Bell,
  BellRing,
  Mail,
  Smartphone,
  Check,
  RotateCcw,
  Send,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface MilestonePhase {
  id: string;
  phaseCode: string;
  name: string;
  status: 'completed' | 'current' | 'upcoming';
  startDate: string;
  estimatedCompletion: string;
  durationWorkingDays: number;
  progressPercent: number; // 0 - 100
  keyDeliverable: string;
  signoffLead: string;
  weekOffsetPercent: number; // 0 - 100 on the GANTT axis
  weekSpanPercent: number; // width on the GANTT axis
}

export interface NotificationSubscription {
  email: string;
  emailEnabled: boolean;
  pushEnabled: boolean;
  notifyOnMilestoneCompleted: boolean;
  notifyOnVaultRelease: boolean;
  subscribedAt: string;
}

export interface NotificationDispatchLog {
  id: string;
  timestamp: string;
  milestoneCode: string;
  milestoneName: string;
  channels: string[];
  recipientEmail?: string;
  message: string;
}

export interface ClientProject {
  referenceId: string;
  clientName: string;
  organization: string;
  projectTitle: string;
  leadPartner: string;
  startDate: string;
  estimatedCompletion: string;
  overallProgress: number; // 0 - 100
  currentPhase: string;
  phaseDescription: string;
  statusBadge: 'In Progress' | 'In Vector QA' | 'Completed & Shipped' | 'Discovery Scheduled';
  sprintWeekCount: number;
  currentSprintPositionPercent: number; // Where "today" sits on the GANTT bar (0 - 100)
  deliverables: {
    name: string;
    format: string;
    status: 'Ready' | 'In Progress' | 'Queued';
    fileSize?: string;
  }[];
  financials: {
    totalEstimate: string;
    depositPaid: boolean;
    depositDate: string;
    balancePaid: boolean;
    invoiceRef: string;
    paymentMethod: string;
  };
  timelinePhases: MilestonePhase[];
}

export const SEEDED_PROJECTS: Record<string, ClientProject> = {
  'AK-GH-2026-8492': {
    referenceId: 'AK-GH-2026-8492',
    clientName: 'Kwame Mensah',
    organization: 'Gold Coast Meridian Holdings',
    projectTitle: 'Corporate Identity Architecture & Hardcover Annual Report',
    leadPartner: 'Kwabena Asante (Managing Partner, Accra)',
    startDate: 'Oct 14, 2026',
    estimatedCompletion: 'Nov 28, 2026',
    overallProgress: 75,
    sprintWeekCount: 6,
    currentSprintPositionPercent: 72,
    currentPhase: 'Phase 03 · Pre-Press Color Calibration & Wet Proofing',
    phaseDescription:
      'Fogra51 color separations completed with Fogra press-room. Smyth-sewn book mockups and blind-embossed stationery currently in physical press review.',
    statusBadge: 'In Progress',
    deliverables: [
      { name: 'Primary Wordmark & Crest Vector Master', format: '.AI / .SVG / .EPS', status: 'Ready', fileSize: '18.4 MB' },
      { name: '64-Page Brand Constitution Monograph', format: '.PDF/X-4 & InDesign', status: 'Ready', fileSize: '84.2 MB' },
      { name: 'Executive Tactile Stationery Suite', format: '.AI & CAD Die-Lines', status: 'Ready', fileSize: '12.8 MB' },
      { name: 'Hardcover Monograph Press Wet-Proofs', format: 'Physical Chromalin', status: 'In Progress' },
      { name: 'Tokenized Multi-Platform Figma Library', format: 'Figma Tokens & JSON', status: 'Queued' },
    ],
    financials: {
      totalEstimate: 'GH₵ 215,600 ($14,000 USD)',
      depositPaid: true,
      depositDate: 'Oct 14, 2026 via GhIPSS Wire',
      balancePaid: false,
      invoiceRef: 'GRA-VAT-2026-8819',
      paymentMethod: 'Ecobank Ghana Treasury / GIP',
    },
    timelinePhases: [
      {
        id: 'phase-1',
        phaseCode: 'PHASE 01',
        name: 'Semiotic Discovery & Competitive Audit',
        status: 'completed',
        startDate: 'Oct 14, 2026',
        estimatedCompletion: 'Oct 23, 2026',
        durationWorkingDays: 8,
        progressPercent: 100,
        keyDeliverable: 'Competitive Topology & Semiotic Territory Dossier',
        signoffLead: 'Kwabena Asante (Accra)',
        weekOffsetPercent: 0,
        weekSpanPercent: 22,
      },
      {
        id: 'phase-2',
        phaseCode: 'PHASE 02',
        name: 'Vector Geometry, Typography & Palette Chemistry',
        status: 'completed',
        startDate: 'Oct 24, 2026',
        estimatedCompletion: 'Nov 07, 2026',
        durationWorkingDays: 10,
        progressPercent: 100,
        keyDeliverable: 'Cartesian Grid Construction & Fogra51 Swatches',
        signoffLead: 'Nana Banyin Opoku (Design Principal)',
        weekOffsetPercent: 22,
        weekSpanPercent: 26,
      },
      {
        id: 'phase-3',
        phaseCode: 'PHASE 03',
        name: 'Pre-Press Proofs, Smyth-Sewn Binding & Stationery',
        status: 'current',
        startDate: 'Nov 08, 2026',
        estimatedCompletion: 'Nov 20, 2026',
        durationWorkingDays: 10,
        progressPercent: 70,
        keyDeliverable: 'Wet Press Sign-Off & CAD Blind-Deboss Plates',
        signoffLead: 'Kwabena Asante (On-Press, Accra)',
        weekOffsetPercent: 48,
        weekSpanPercent: 28,
      },
      {
        id: 'phase-4',
        phaseCode: 'PHASE 04',
        name: 'Final Master Package Release & 100% IP Handoff',
        status: 'upcoming',
        startDate: 'Nov 21, 2026',
        estimatedCompletion: 'Nov 28, 2026',
        durationWorkingDays: 6,
        progressPercent: 0,
        keyDeliverable: 'Master Production Archive & Trademark Assignment',
        signoffLead: 'Senior Partners Council',
        weekOffsetPercent: 76,
        weekSpanPercent: 24,
      },
    ],
  },
  'AK-GH-2026-3104': {
    referenceId: 'AK-GH-2026-3104',
    clientName: 'Elena Rostova',
    organization: 'Krono Horology Geneva',
    projectTitle: 'Horological Logomark Architecture & Micro-Engraving Specification',
    leadPartner: 'Nana Banyin Opoku (Principal Designer, Zürich & Accra)',
    startDate: 'Sep 02, 2026',
    estimatedCompletion: 'Oct 18, 2026',
    overallProgress: 100,
    sprintWeekCount: 6,
    currentSprintPositionPercent: 100,
    currentPhase: 'Phase 04 · Complete & Worldwide IP Rights Transferred',
    phaseDescription:
      '0.4mm micro-milling vector masters cleared Swiss CNC fabrication and registered with the Registrar General & USPTO. All production packages archived.',
    statusBadge: 'Completed & Shipped',
    deliverables: [
      { name: 'Micro-Scale CNC Vector Dial Master', format: '.AI / .DXF / .SVG', status: 'Ready', fileSize: '9.2 MB' },
      { name: 'Titanium Crown Hallmark Blueprint', format: '.PDF/X-4 Vector Spec', status: 'Ready', fileSize: '14.5 MB' },
      { name: 'Worldwide Trademark Assignment Deed', format: 'Signed Legal Deed (.PDF)', status: 'Ready', fileSize: '2.1 MB' },
      { name: 'Responsive Digital Favicon & App Matrix', format: 'Pixel-Hinted .PNG & .SVG', status: 'Ready', fileSize: '6.4 MB' },
    ],
    financials: {
      totalEstimate: '$6,500 USD (GH₵ 100,100)',
      depositPaid: true,
      depositDate: 'Sep 02, 2026 via SWIFT Wire',
      balancePaid: true,
      invoiceRef: 'GRA-VAT-2026-4190',
      paymentMethod: 'SWIFT MT103 Corporate Settlement',
    },
    timelinePhases: [
      {
        id: 'phase-1',
        phaseCode: 'PHASE 01',
        name: 'Horological Heritage & Semiotic Topology',
        status: 'completed',
        startDate: 'Sep 02, 2026',
        estimatedCompletion: 'Sep 11, 2026',
        durationWorkingDays: 7,
        progressPercent: 100,
        keyDeliverable: 'Swiss Watchmaking Semiotic Brief',
        signoffLead: 'Elena Rostova & Studio Director',
        weekOffsetPercent: 0,
        weekSpanPercent: 23,
      },
      {
        id: 'phase-2',
        phaseCode: 'PHASE 02',
        name: 'Radial Golden Ratio & Bezier Construction',
        status: 'completed',
        startDate: 'Sep 12, 2026',
        estimatedCompletion: 'Sep 26, 2026',
        durationWorkingDays: 10,
        progressPercent: 100,
        keyDeliverable: '3 Polar-Coordinate Vector Explorations',
        signoffLead: 'Nana Banyin Opoku (Zürich)',
        weekOffsetPercent: 23,
        weekSpanPercent: 27,
      },
      {
        id: 'phase-3',
        phaseCode: 'PHASE 03',
        name: '0.4mm CNC Titanium Hallmark Stress-Testing',
        status: 'completed',
        startDate: 'Sep 27, 2026',
        estimatedCompletion: 'Oct 09, 2026',
        durationWorkingDays: 10,
        progressPercent: 100,
        keyDeliverable: 'CNC Toolpath Calibration & Optical Clearspace',
        signoffLead: 'Geneva Fabrication Desk',
        weekOffsetPercent: 50,
        weekSpanPercent: 26,
      },
      {
        id: 'phase-4',
        phaseCode: 'PHASE 04',
        name: 'Final Production Archive & Trademark Assignment',
        status: 'completed',
        startDate: 'Oct 10, 2026',
        estimatedCompletion: 'Oct 18, 2026',
        durationWorkingDays: 6,
        progressPercent: 100,
        keyDeliverable: 'Worldwide Copyright & USPTO Clearance Deed',
        signoffLead: 'Legal & Managing Director',
        weekOffsetPercent: 76,
        weekSpanPercent: 24,
      },
    ],
  },
  'AK-GH-2026-5519': {
    referenceId: 'AK-GH-2026-5519',
    clientName: 'Ama Serwaa Osei',
    organization: 'Aura Botanica Apothecary',
    projectTitle: 'Luxury Fluted Skincare Packaging & Amber Vessel Labelling',
    leadPartner: 'Kwabena Asante (Managing Partner, Accra)',
    startDate: 'Oct 28, 2026',
    estimatedCompletion: 'Dec 05, 2026',
    overallProgress: 45,
    sprintWeekCount: 6,
    currentSprintPositionPercent: 44,
    currentPhase: 'Phase 02 · CAD Structural Die-Lines & Hot Foil Stamping Plates',
    phaseDescription:
      'Plastic-free fluted carton die-lines and hot-stamped copper foil plates approved. 3D studio unboxing renders being compiled for marketing campaign.',
    statusBadge: 'In Progress',
    deliverables: [
      { name: 'Amber Vessel Label System (30ml / 100ml)', format: '.AI (Vector Die-Lines)', status: 'Ready', fileSize: '11.4 MB' },
      { name: 'Fluted Cotton Rigid Box CAD Specs', format: '.AI & 3D Fold PDF', status: 'In Progress' },
      { name: 'Hot Foil Copper Stamping Brass Die', format: '.EPS Spot Vector', status: 'In Progress' },
      { name: 'Botanical Monograph Product Lookbook', format: '.INDD & .PDF/X-4', status: 'Queued' },
    ],
    financials: {
      totalEstimate: 'GH₵ 146,300 ($9,500 USD)',
      depositPaid: true,
      depositDate: 'Oct 28, 2026 via MTN MoMo Pay',
      balancePaid: false,
      invoiceRef: 'GRA-VAT-2026-9214',
      paymentMethod: 'MTN Mobile Money Merchant Pay (*170#)',
    },
    timelinePhases: [
      {
        id: 'phase-1',
        phaseCode: 'PHASE 01',
        name: 'Botanical Heritage & Vessel Audit',
        status: 'completed',
        startDate: 'Oct 28, 2026',
        estimatedCompletion: 'Nov 06, 2026',
        durationWorkingDays: 7,
        progressPercent: 100,
        keyDeliverable: 'Substrate & Glass Surface Specifications',
        signoffLead: 'Kwabena Asante (Accra)',
        weekOffsetPercent: 0,
        weekSpanPercent: 23,
      },
      {
        id: 'phase-2',
        phaseCode: 'PHASE 02',
        name: 'CAD Fluted Die-Lines & Hot Foil Tooling',
        status: 'current',
        startDate: 'Nov 07, 2026',
        estimatedCompletion: 'Nov 19, 2026',
        durationWorkingDays: 10,
        progressPercent: 65,
        keyDeliverable: 'Rigid Fluted Box CAD & Brass Stamping Plates',
        signoffLead: 'Ama Serwaa Osei & Creative Director',
        weekOffsetPercent: 23,
        weekSpanPercent: 27,
      },
      {
        id: 'phase-3',
        phaseCode: 'PHASE 03',
        name: 'Wet-Proofing & Paper Grain Direction Audit',
        status: 'upcoming',
        startDate: 'Nov 20, 2026',
        estimatedCompletion: 'Nov 29, 2026',
        durationWorkingDays: 8,
        progressPercent: 0,
        keyDeliverable: 'Uncoated Cotton Substrate Wet-Press Sign-Off',
        signoffLead: 'Master Printer & Lead Designer',
        weekOffsetPercent: 50,
        weekSpanPercent: 25,
      },
      {
        id: 'phase-4',
        phaseCode: 'PHASE 04',
        name: 'Retail Packaging Press Supervision & Handoff',
        status: 'upcoming',
        startDate: 'Nov 30, 2026',
        estimatedCompletion: 'Dec 05, 2026',
        durationWorkingDays: 5,
        progressPercent: 0,
        keyDeliverable: 'Certified Press Kit & Digital Asset Locker',
        signoffLead: 'Senior Partners Council',
        weekOffsetPercent: 75,
        weekSpanPercent: 25,
      },
    ],
  },
};

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialReferenceId?: string;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({
  isOpen,
  onClose,
  initialReferenceId,
}) => {
  const [searchInput, setSearchInput] = useState(initialReferenceId || '');
  const [activeProject, setActiveProject] = useState<ClientProject | null>(null);
  const [searched, setSearched] = useState(false);
  const [simulatedDownload, setSimulatedDownload] = useState<string | null>(null);
  const [timelineViewMode, setTimelineViewMode] = useState<'gantt' | 'cards'>('gantt');
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | null>(null);

  // Notification Subscription & Real-Time Alert State
  const [subscription, setSubscription] = useState<NotificationSubscription | null>(null);
  const [isSubDrawerOpen, setIsSubDrawerOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('nanabanyinopoku@gmail.com');
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(false);
  const [pushPermission, setPushPermission] = useState<NotificationPermission | 'unsupported'>('default');
  const [notifyOnMilestoneCompleted, setNotifyOnMilestoneCompleted] = useState(true);
  const [notifyOnVaultRelease, setNotifyOnVaultRelease] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [dispatchedAlert, setDispatchedAlert] = useState<{
    title: string;
    message: string;
    channels: string[];
    timestamp: string;
    milestoneCode: string;
  } | null>(null);
  const [dispatchLogs, setDispatchLogs] = useState<NotificationDispatchLog[]>([]);
  const [showLogsDrawer, setShowLogsDrawer] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPushPermission(Notification.permission);
      if (Notification.permission === 'granted') {
        setPushEnabled(true);
      }
    } else {
      setPushPermission('unsupported');
    }
  }, []);

  useEffect(() => {
    if (!activeProject) return;
    const refKey = activeProject.referenceId;
    // Load subscription from localStorage
    const savedSubStr = localStorage.getItem(`apex_sub_${refKey}`);
    if (savedSubStr) {
      try {
        const parsed: NotificationSubscription = JSON.parse(savedSubStr);
        setSubscription(parsed);
        setEmailInput(parsed.email);
        setEmailEnabled(parsed.emailEnabled);
        setPushEnabled(parsed.pushEnabled);
        setNotifyOnMilestoneCompleted(parsed.notifyOnMilestoneCompleted);
        setNotifyOnVaultRelease(parsed.notifyOnVaultRelease);
      } catch (e) {
        console.warn('Failed to parse subscription', e);
      }
    } else {
      setSubscription(null);
    }

    // Load dispatch logs from localStorage
    const savedLogsStr = localStorage.getItem(`apex_logs_${refKey}`);
    if (savedLogsStr) {
      try {
        setDispatchLogs(JSON.parse(savedLogsStr));
      } catch (e) {
        setDispatchLogs([]);
      }
    } else {
      setDispatchLogs([]);
    }
  }, [activeProject?.referenceId]);

  useEffect(() => {
    if (initialReferenceId) {
      setSearchInput(initialReferenceId);
      const match = SEEDED_PROJECTS[initialReferenceId];
      if (match) {
        setActiveProject(match);
        setSearched(true);
      }
    }
  }, [initialReferenceId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleLookup = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanRef = searchInput.trim().toUpperCase();
    if (!cleanRef) return;

    setSearched(true);
    if (SEEDED_PROJECTS[cleanRef]) {
      setActiveProject(SEEDED_PROJECTS[cleanRef]);
    } else {
      // Synthesized project tracker for any freshly submitted user brief
      setActiveProject({
        referenceId: cleanRef,
        clientName: 'Project Owner',
        organization: 'Client Venture',
        projectTitle: 'Configured Graphic Design & Brand Architecture Scope',
        leadPartner: 'Kwabena Asante (Senior Partner, Accra Desk)',
        startDate: 'Nov 05, 2026',
        estimatedCompletion: 'Dec 08, 2026',
        overallProgress: 20,
        sprintWeekCount: 5,
        currentSprintPositionPercent: 20,
        currentPhase: 'Phase 01 · Semiotic Discovery & Brief Verification',
        phaseDescription:
          'Your project brief has been logged with our Accra Treasury. A Senior Managing Partner is reviewing the configured deliverables matrix.',
        statusBadge: 'Discovery Scheduled',
        deliverables: [
          { name: 'Configured Studio Deliverable Matrix', format: '.PDF Specification', status: 'Ready', fileSize: '2.4 MB' },
          { name: 'Discovery Milestone Agenda', format: 'Video Loom / Deck', status: 'In Progress' },
          { name: 'Master Artwork Vector Archive', format: '.AI & .SVG', status: 'Queued' },
        ],
        financials: {
          totalEstimate: 'Pending Final Brief Confirmation',
          depositPaid: true,
          depositDate: 'Logged in Studio Queue',
          balancePaid: false,
          invoiceRef: `GRA-VAT-${cleanRef.replace(/\D/g, '').slice(0, 4) || '2026'}`,
          paymentMethod: 'Ghana MoMo / GhIPSS / Card',
        },
        timelinePhases: [
          {
            id: 'dyn-1',
            phaseCode: 'PHASE 01',
            name: 'Brief Verification & Semiotic Discovery Call',
            status: 'current',
            startDate: 'Nov 05, 2026',
            estimatedCompletion: 'Nov 12, 2026',
            durationWorkingDays: 6,
            progressPercent: 40,
            keyDeliverable: 'Semiotic Discovery Blueprint & Sprint Schedule',
            signoffLead: 'Senior Partner Desk',
            weekOffsetPercent: 0,
            weekSpanPercent: 24,
          },
          {
            id: 'dyn-2',
            phaseCode: 'PHASE 02',
            name: 'Vector Architecture & Typographic Scaling',
            status: 'upcoming',
            startDate: 'Nov 13, 2026',
            estimatedCompletion: 'Nov 23, 2026',
            durationWorkingDays: 8,
            progressPercent: 0,
            keyDeliverable: 'Cartesian Bezier Grids & Color Ratios',
            signoffLead: 'Principal Designer',
            weekOffsetPercent: 24,
            weekSpanPercent: 28,
          },
          {
            id: 'dyn-3',
            phaseCode: 'PHASE 03',
            name: 'Systemization & Multi-Substrate Calibration',
            status: 'upcoming',
            startDate: 'Nov 24, 2026',
            estimatedCompletion: 'Dec 02, 2026',
            durationWorkingDays: 8,
            progressPercent: 0,
            keyDeliverable: 'Pre-Press PDF/X-4 & Digital Tokens',
            signoffLead: 'Lead Creative Engineer',
            weekOffsetPercent: 52,
            weekSpanPercent: 26,
          },
          {
            id: 'dyn-4',
            phaseCode: 'PHASE 04',
            name: 'Production Release & 100% IP Assignment',
            status: 'upcoming',
            startDate: 'Dec 03, 2026',
            estimatedCompletion: 'Dec 08, 2026',
            durationWorkingDays: 5,
            progressPercent: 0,
            keyDeliverable: 'Master Production Kit & Trademark Deed',
            signoffLead: 'Senior Partners Council',
            weekOffsetPercent: 78,
            weekSpanPercent: 22,
          },
        ],
      });
    }
  };

  const handleSelectSample = (refKey: string) => {
    setSearchInput(refKey);
    setActiveProject(SEEDED_PROJECTS[refKey]);
    setSearched(true);
    setSelectedMilestoneId(null);
  };

  const handleDownloadAsset = (assetName: string) => {
    setSimulatedDownload(assetName);
    setTimeout(() => {
      setSimulatedDownload(null);
      const dummyContent = `APEX KONCEPTS STUDIO ARCHIVE\nAsset: ${assetName}\nChecksum: SHA256-${Math.random().toString(36).substring(2)}\nStatus: Verified Master File\nController: Apex Koncepts Ltd, Accra, Ghana`;
      const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${assetName.replace(/\s+/g, '-').toLowerCase()}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }, 800);
  };

  const handleRequestPushPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      alert('Browser Web Push is not supported in this browser environment.');
      return;
    }
    try {
      const perm = await Notification.requestPermission();
      setPushPermission(perm);
      if (perm === 'granted') {
        setPushEnabled(true);
        try {
          new Notification('Apex Koncepts · Push Notification Stream Armed', {
            body: `Web push notifications registered for Project ${activeProject?.referenceId}. Alerts will dispatch whenever a milestone transitions to completed.`,
            icon: '/icon.svg',
          });
        } catch (e) {
          console.warn('Native notification spawn failed', e);
        }
      }
    } catch (err) {
      console.error('Error requesting notification permission', err);
    }
  };

  const handleSaveSubscription = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!activeProject) return;
    if (emailEnabled && !emailInput.trim()) return;

    const newSub: NotificationSubscription = {
      email: emailInput.trim(),
      emailEnabled,
      pushEnabled,
      notifyOnMilestoneCompleted: true,
      notifyOnVaultRelease,
      subscribedAt: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setSubscription(newSub);
    localStorage.setItem(`apex_sub_${activeProject.referenceId}`, JSON.stringify(newSub));
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsSubDrawerOpen(false);
    }, 1400);
  };

  const handleUnsubscribe = () => {
    if (!activeProject) return;
    setSubscription(null);
    localStorage.removeItem(`apex_sub_${activeProject.referenceId}`);
    setSaveSuccess(false);
  };

  const handleSendTestAlert = () => {
    if (!activeProject) return;
    const channels: string[] = [];
    if (emailEnabled) channels.push(`Email (${emailInput})`);
    if (pushEnabled && pushPermission === 'granted') channels.push('Web Push');

    if ('Notification' in window && Notification.permission === 'granted' && pushEnabled) {
      try {
        new Notification('Apex Koncepts · Test Milestone Gate Alert', {
          body: `Verification ping for ${activeProject.referenceId}: Milestone status alert channels verified operational.`,
          icon: '/icon.svg',
        });
      } catch (err) {
        console.warn('Test push notification error', err);
      }
    }

    setDispatchedAlert({
      title: 'Test Notification Dispatched',
      message: `Verification ping transmitted for Project ${activeProject.referenceId}. Channels verified: ${channels.join(', ') || 'In-Portal Feed'}.`,
      channels: channels.length > 0 ? channels : ['In-Portal Feed'],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      milestoneCode: 'TEST GATE',
    });
  };

  const handleAdvanceMilestoneStatus = (targetId?: string) => {
    if (!activeProject) return;

    const phases = [...activeProject.timelinePhases];
    let milestoneIndex = -1;

    if (targetId) {
      milestoneIndex = phases.findIndex((p) => p.id === targetId);
    } else {
      // Find first non-completed milestone (either 'current' or 'upcoming')
      milestoneIndex = phases.findIndex((p) => p.status === 'current');
      if (milestoneIndex === -1) {
        milestoneIndex = phases.findIndex((p) => p.status === 'upcoming');
      }
    }

    if (milestoneIndex === -1) {
      alert('All milestones for this project are already completed! Click "Reset Milestones" below to run the simulation again.');
      return;
    }

    const targetMilestone = { ...phases[milestoneIndex] };
    const prevStatus = targetMilestone.status;

    // Transition status to completed
    targetMilestone.status = 'completed';
    targetMilestone.progressPercent = 100;
    phases[milestoneIndex] = targetMilestone;

    // Advance next milestone to 'current' if available
    if (milestoneIndex + 1 < phases.length) {
      if (phases[milestoneIndex + 1].status === 'upcoming') {
        phases[milestoneIndex + 1] = {
          ...phases[milestoneIndex + 1],
          status: 'current',
          progressPercent: 35,
        };
      }
    }

    // Deliverables update: if an associated deliverable was awaiting signoff, mark it as Ready
    const updatedDeliverables = activeProject.deliverables.map((del, dIdx) => {
      if (milestoneIndex >= 2 && dIdx === 3) {
        return { ...del, status: 'Ready' as const, fileSize: '24.6 MB' };
      }
      if (milestoneIndex >= 3 && dIdx === 4) {
        return { ...del, status: 'Ready' as const, fileSize: '16.8 MB' };
      }
      return del;
    });

    const completedCount = phases.filter((p) => p.status === 'completed').length;
    const newOverallProgress = Math.round((completedCount / phases.length) * 100);
    const isProjectComplete = completedCount === phases.length;

    const updatedProject: ClientProject = {
      ...activeProject,
      timelinePhases: phases,
      deliverables: updatedDeliverables,
      overallProgress: newOverallProgress,
      currentSprintPositionPercent: isProjectComplete ? 100 : Math.min(95, targetMilestone.weekOffsetPercent + targetMilestone.weekSpanPercent),
      statusBadge: isProjectComplete ? 'Completed & Shipped' : activeProject.statusBadge,
      currentPhase:
        milestoneIndex + 1 < phases.length
          ? `${phases[milestoneIndex + 1].phaseCode} · ${phases[milestoneIndex + 1].name}`
          : 'Phase 04 · Complete & Worldwide IP Rights Transferred',
    };

    setActiveProject(updatedProject);
    setSelectedMilestoneId(targetMilestone.id);

    // Prepare Dispatched Notification Alert
    const activeChannels: string[] = [];
    if (subscription ? subscription.emailEnabled : emailEnabled) {
      activeChannels.push(`Email: ${subscription?.email || emailInput}`);
    }
    if ((subscription ? subscription.pushEnabled : pushEnabled) && pushPermission === 'granted') {
      activeChannels.push('Web Push');
    }

    const alertMessage = `${targetMilestone.phaseCode} (${targetMilestone.name}) status updated from '${prevStatus}' to 'COMPLETED'. Stage-gate verified by ${targetMilestone.signoffLead}. Master vectors and artifacts released to client vault.`;

    // Trigger Native Browser Web Push Notification
    if ('Notification' in window && Notification.permission === 'granted' && ((subscription?.pushEnabled) || pushEnabled)) {
      try {
        new Notification(`Apex Koncepts · ${targetMilestone.phaseCode} Completed`, {
          body: `${targetMilestone.name} status updated to COMPLETED. Sign-off Lead: ${targetMilestone.signoffLead}.`,
          icon: '/icon.svg',
        });
      } catch (err) {
        console.warn('Native notification error', err);
      }
    }

    // Set prominent in-portal notification toast
    setDispatchedAlert({
      title: `Milestone Status Updated to COMPLETED: ${targetMilestone.phaseCode}`,
      message: alertMessage,
      channels: activeChannels.length > 0 ? activeChannels : ['Portal In-App Feed'],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      milestoneCode: targetMilestone.phaseCode,
    });

    // Record in dispatch logs
    const newLog: NotificationDispatchLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      milestoneCode: targetMilestone.phaseCode,
      milestoneName: targetMilestone.name,
      channels: activeChannels.length > 0 ? activeChannels : ['In-Portal Feed'],
      recipientEmail: (subscription ? subscription.emailEnabled : emailEnabled) ? (subscription?.email || emailInput) : undefined,
      message: `Status updated from '${prevStatus}' to 'COMPLETED'. Sign-off Authority: ${targetMilestone.signoffLead}.`,
    };

    const newLogs = [newLog, ...dispatchLogs];
    setDispatchLogs(newLogs);
    localStorage.setItem(`apex_logs_${activeProject.referenceId}`, JSON.stringify(newLogs));
  };

  const handleResetMilestones = () => {
    if (!activeProject) return;
    const refKey = activeProject.referenceId;
    if (SEEDED_PROJECTS[refKey]) {
      const resetCopy = JSON.parse(JSON.stringify(SEEDED_PROJECTS[refKey]));
      setActiveProject(resetCopy);
      setSelectedMilestoneId(null);
      setDispatchedAlert(null);
    } else {
      handleLookup();
    }
  };

  if (!isOpen) return null;

  const currentMilestone =
    activeProject?.timelinePhases.find((p) => p.status === 'current') ||
    activeProject?.timelinePhases[activeProject.timelinePhases.length - 1];

  const highlightedMilestone = selectedMilestoneId
    ? activeProject?.timelinePhases.find((p) => p.id === selectedMilestoneId)
    : currentMilestone;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1917]/70 backdrop-blur-[2px] p-2 sm:p-4 md:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="client-portal-title"
    >
      <div
        className="w-full max-w-5xl bg-[#FBF9F5] text-[#1C1917] border border-[#D6CEBE] max-h-[92vh] overflow-y-auto flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Top Sticky Header */}
          <div className="sticky top-0 z-20 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-[#E5DFD5] px-5 py-4 md:px-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#15803D]" />
              <h2 id="client-portal-title" className="text-sm md:text-base font-semibold tracking-tight text-[#1C1917]">
                Apex Client Portal · Live Project Telemetry & GANTT Schedule
              </h2>
            </div>
            <button
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-[#57534E] hover:text-[#1C1917] cursor-pointer"
              aria-label="Close client portal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search Bar & Quick Sample References */}
          <div className="p-5 md:p-8 space-y-6 border-b border-[#E5DFD5] bg-[#F4EFEA]">
            <form onSubmit={handleLookup} className="space-y-3">
              <label htmlFor="portal-ref-input" className="block text-xs font-mono-num uppercase tracking-wider text-[#78716C]">
                Enter Your Studio Project Reference Number
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    id="portal-ref-input"
                    type="text"
                    required
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="e.g. AK-GH-2026-8492"
                    className="w-full min-h-[44px] pl-4 pr-10 py-2.5 text-sm bg-[#FBF9F5] border border-[#D6CEBE] focus:border-[#1C1917] focus:outline-none font-mono-num text-[#1C1917]"
                  />
                  <Search className="w-4 h-4 text-[#78716C] absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
                <button
                  type="submit"
                  className="min-h-[44px] px-6 py-2.5 bg-[#1C1917] hover:bg-[#C2410C] text-[#FBF9F5] text-xs font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Fetch Milestone Schedule</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Quick-Click Sample References */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-[#78716C]">Sample Active References:</span>
              {Object.keys(SEEDED_PROJECTS).map((refKey) => (
                <button
                  key={refKey}
                  type="button"
                  onClick={() => handleSelectSample(refKey)}
                  className={`min-h-[36px] px-2.5 py-1 font-mono-num border text-xs transition-colors cursor-pointer ${
                    activeProject?.referenceId === refKey
                      ? 'bg-[#1C1917] text-[#FBF9F5] border-[#1C1917]'
                      : 'bg-[#FBF9F5] text-[#57534E] border-[#D6CEBE] hover:border-[#1C1917]'
                  }`}
                >
                  {refKey} ({SEEDED_PROJECTS[refKey].organization.split(' ')[0]})
                </button>
              ))}
            </div>
          </div>

          {/* Project Details Viewport */}
          {activeProject ? (
            <div className="p-5 md:p-8 space-y-8">
              {/* Project Title & Status Hero */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-[#E5DFD5] pb-6">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono-num text-[#78716C]">
                    <span className="text-[#C2410C] font-semibold">{activeProject.referenceId}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeProject.organization}</span>
                    <span aria-hidden="true">·</span>
                    <span>Client: {activeProject.clientName}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#1C1917]">
                    {activeProject.projectTitle}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#57534E]">
                    <UserCheck className="w-3.5 h-3.5 text-[#C2410C]" />
                    <span>Assigned Lead: {activeProject.leadPartner}</span>
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0">
                  <span
                    className={`px-3 py-1 text-xs font-mono-num font-semibold ${
                      activeProject.statusBadge === 'Completed & Shipped'
                        ? 'bg-[#15803D] text-[#FBF9F5]'
                        : 'bg-[#1C1917] text-[#FBF9F5]'
                    }`}
                  >
                    {activeProject.statusBadge}
                  </span>
                  <span className="text-xs font-mono-num text-[#78716C]">
                    Final Delivery: {activeProject.estimatedCompletion}
                  </span>
                </div>
              </div>

              {/* OVERALL PROGRESS & CURRENT GATE STRIP */}
              <div className="space-y-3 bg-[#F4EFEA] border border-[#E5DFD5] p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-num">
                  <span className="font-semibold text-[#1C1917]">
                    Overall Sprint Progression ({activeProject.sprintWeekCount}-Week Production Schedule)
                  </span>
                  <span className="text-[#C2410C] font-bold text-sm">
                    {activeProject.overallProgress}% Complete
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#E5DFD5] overflow-hidden">
                  <div
                    style={{ width: `${activeProject.overallProgress}%` }}
                    className="h-full bg-[#C2410C] transition-all duration-500"
                  />
                </div>
                <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#44403C]">
                  <div>
                    <strong className="text-[#1C1917]">Current Milestone Gate: </strong>
                    <span>{activeProject.currentPhase}</span>
                  </div>
                  <div className="font-mono-num text-[#C2410C] font-medium shrink-0">
                    Est. Sign-off: {currentMilestone?.estimatedCompletion || activeProject.estimatedCompletion}
                  </div>
                </div>
              </div>

              {/* LIVE DISPATCHED NOTIFICATION TOAST / BANNER */}
              <AnimatePresence>
                {dispatchedAlert && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 md:p-5 bg-[#1C1917] text-[#FBF9F5] border border-[#C2410C] shadow-lg space-y-2 relative"
                    role="alert"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#C2410C]/20 text-[#C2410C] flex items-center justify-center shrink-0">
                          <BellRing className="w-4 h-4 animate-bounce" />
                        </div>
                        <div>
                          <div className="text-xs font-mono-num uppercase tracking-wider text-[#C2410C] font-semibold flex items-center gap-2">
                            <span>{dispatchedAlert.title}</span>
                            <span className="text-[#A8A29E] font-normal">· {dispatchedAlert.timestamp}</span>
                          </div>
                          <div className="text-sm font-medium text-[#FBF9F5]">
                            {dispatchedAlert.message}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setDispatchedAlert(null)}
                        className="text-[#A8A29E] hover:text-[#FBF9F5] p-1 cursor-pointer shrink-0"
                        aria-label="Dismiss alert"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#44403C]/60 text-[11px] font-mono-num">
                      <span className="text-[#A8A29E]">Dispatched via:</span>
                      {dispatchedAlert.channels.map((chan, cIdx) => (
                        <span key={cIdx} className="px-2 py-0.5 bg-[#292524] border border-[#44403C] text-[#FBF9F5]">
                          {chan}
                        </span>
                      ))}
                      <span className="text-[#15803D] font-medium ml-auto flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Delivery Confirmed
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* MILESTONE NOTIFICATION SUBSCRIPTION CONTROLS & LIVE DRAWER */}
              <div className="bg-[#F4EFEA] border border-[#D6CEBE] p-4 md:p-5 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-[#C2410C]" />
                      <h4 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-[#1C1917]">
                        Milestone Status Change Notifications
                      </h4>
                      {subscription ? (
                        <span className="px-2 py-0.5 bg-[#15803D] text-[#FBF9F5] text-[10px] font-mono-num font-semibold">
                          SUBSCRIBED
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-[#E5DFD5] text-[#57534E] text-[10px] font-mono-num">
                          SUBSCRIPTION READY
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#57534E]">
                      {subscription
                        ? `Subscribed to email (${subscription.email})${subscription.pushEnabled ? ' and Web Push notifications' : ''} whenever milestone status transitions from pending/current to completed.`
                        : 'Subscribe to automatic email or browser push alerts whenever milestone status transitions from pending/current to completed.'}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsSubDrawerOpen(!isSubDrawerOpen)}
                      className="min-h-[38px] px-3.5 py-1.5 text-xs font-medium border border-[#D6CEBE] bg-[#FBF9F5] hover:border-[#1C1917] text-[#1C1917] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Bell className="w-3.5 h-3.5 text-[#C2410C]" />
                      <span>{subscription ? 'Manage Subscription' : 'Subscribe to Alerts'}</span>
                      {isSubDrawerOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAdvanceMilestoneStatus()}
                      className="min-h-[38px] px-3.5 py-1.5 text-xs font-medium bg-[#C2410C] hover:bg-[#9A3412] text-white transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                      title="Simulate updating the next milestone status to Completed"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Simulate Status Update (Pending ➔ Completed)</span>
                    </button>

                    {activeProject.timelinePhases.some((p) => p.status === 'completed') && (
                      <button
                        type="button"
                        onClick={handleResetMilestones}
                        className="min-h-[38px] px-2.5 py-1.5 text-xs text-[#57534E] hover:text-[#1C1917] border border-transparent hover:border-[#D6CEBE] transition-colors cursor-pointer flex items-center gap-1"
                        title="Reset project milestones back to initial state"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span className="hidden sm:inline">Reset</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* EXPANDABLE SUBSCRIPTION CONFIGURATION DRAWER */}
                <AnimatePresence>
                  {isSubDrawerOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-4 border-t border-[#D6CEBE] space-y-4 overflow-hidden"
                    >
                      <form onSubmit={handleSaveSubscription} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Channel 1: Email */}
                          <div className="p-3.5 bg-[#FBF9F5] border border-[#D6CEBE] space-y-2.5">
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-semibold text-[#1C1917] flex items-center gap-1.5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={emailEnabled}
                                  onChange={(e) => setEmailEnabled(e.target.checked)}
                                  className="accent-[#C2410C] w-4 h-4"
                                />
                                <Mail className="w-3.5 h-3.5 text-[#C2410C]" />
                                <span>Email Milestone Notifications</span>
                              </label>
                              <span className="text-[10px] font-mono-num text-[#15803D]">Ghana Act 843 Compliant</span>
                            </div>
                            <input
                              type="email"
                              required={emailEnabled}
                              disabled={!emailEnabled}
                              value={emailInput}
                              onChange={(e) => setEmailInput(e.target.value)}
                              placeholder="Enter client notification email"
                              className="w-full min-h-[40px] px-3 py-1.5 text-xs bg-[#F4EFEA] border border-[#D6CEBE] focus:border-[#1C1917] focus:outline-none text-[#1C1917] disabled:opacity-50"
                            />
                            <p className="text-[11px] text-[#78716C]">
                              Sends formal sign-off notice and master vector download links when milestones complete.
                            </p>
                          </div>

                          {/* Channel 2: Push Notifications */}
                          <div className="p-3.5 bg-[#FBF9F5] border border-[#D6CEBE] space-y-2.5">
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-semibold text-[#1C1917] flex items-center gap-1.5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={pushEnabled}
                                  onChange={(e) => setPushEnabled(e.target.checked)}
                                  className="accent-[#C2410C] w-4 h-4"
                                />
                                <Smartphone className="w-3.5 h-3.5 text-[#C2410C]" />
                                <span>Web & Mobile Push Notifications</span>
                              </label>
                              <span className="text-[10px] font-mono-num text-[#78716C] uppercase">
                                Status: {pushPermission}
                              </span>
                            </div>

                            {pushPermission !== 'granted' ? (
                              <button
                                type="button"
                                onClick={handleRequestPushPermission}
                                className="w-full min-h-[40px] px-3 py-1.5 text-xs font-medium bg-[#1C1917] hover:bg-[#C2410C] text-[#FBF9F5] transition-colors cursor-pointer flex items-center justify-center gap-2"
                              >
                                <Bell className="w-3.5 h-3.5" />
                                <span>Request Browser Push Permission</span>
                              </button>
                            ) : (
                              <div className="w-full min-h-[40px] px-3 py-1.5 text-xs bg-[#15803D]/10 border border-[#15803D]/30 text-[#15803D] flex items-center gap-2 font-medium">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Browser Push Notifications Armed & Ready</span>
                              </div>
                            )}
                            <p className="text-[11px] text-[#78716C]">
                              Delivers immediate OS notification banners on macOS, Windows, iOS, and Android devices.
                            </p>
                          </div>
                        </div>

                        {/* Trigger Settings */}
                        <div className="p-3 bg-[#FBF9F5] border border-[#D6CEBE] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                          <span className="font-semibold text-[#1C1917] uppercase tracking-wide font-mono-num">
                            Active Trigger Conditions:
                          </span>
                          <div className="flex flex-wrap items-center gap-4">
                            <label className="flex items-center gap-1.5 text-[#44403C] cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notifyOnMilestoneCompleted}
                                disabled
                                className="accent-[#C2410C] w-3.5 h-3.5"
                              />
                              <span>Status transitions Pending/Current ➔ Completed</span>
                            </label>
                            <label className="flex items-center gap-1.5 text-[#44403C] cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notifyOnVaultRelease}
                                onChange={(e) => setNotifyOnVaultRelease(e.target.checked)}
                                className="accent-[#C2410C] w-3.5 h-3.5"
                              />
                              <span>Master Artifacts released to Vault</span>
                            </label>
                          </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                          <div className="flex items-center gap-2">
                            <button
                              type="submit"
                              className="min-h-[40px] px-5 py-2 bg-[#1C1917] hover:bg-[#C2410C] text-[#FBF9F5] text-xs font-medium transition-colors cursor-pointer flex items-center gap-2"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Save Notification Preferences</span>
                            </button>

                            <button
                              type="button"
                              onClick={handleSendTestAlert}
                              className="min-h-[40px] px-3.5 py-2 bg-[#FBF9F5] border border-[#D6CEBE] hover:border-[#1C1917] text-[#1C1917] text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                            >
                              <Send className="w-3.5 h-3.5 text-[#C2410C]" />
                              <span>Send Test Verification Ping</span>
                            </button>

                            {subscription && (
                              <button
                                type="button"
                                onClick={handleUnsubscribe}
                                className="min-h-[40px] px-3 py-2 text-xs text-[#DC2626] hover:underline cursor-pointer"
                              >
                                Unsubscribe
                              </button>
                            )}
                          </div>

                          {saveSuccess && (
                            <div className="text-xs font-mono-num text-[#15803D] font-semibold flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Preferences saved to client reference record!</span>
                            </div>
                          )}
                        </div>
                      </form>

                      {/* Audit Log / History of Previous Dispatches */}
                      {dispatchLogs.length > 0 && (
                        <div className="pt-3 border-t border-[#D6CEBE] space-y-2">
                          <button
                            type="button"
                            onClick={() => setShowLogsDrawer(!showLogsDrawer)}
                            className="text-xs font-mono-num text-[#78716C] hover:text-[#1C1917] flex items-center gap-1 cursor-pointer"
                          >
                            <span>Recent Dispatched Milestone Alerts ({dispatchLogs.length})</span>
                            {showLogsDrawer ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </button>

                          {showLogsDrawer && (
                            <div className="divide-y divide-[#E5DFD5] border border-[#D6CEBE] bg-[#FBF9F5] max-h-40 overflow-y-auto text-[11px] font-mono-num">
                              {dispatchLogs.map((log) => (
                                <div key={log.id} className="p-2.5 flex items-center justify-between gap-2">
                                  <div className="space-y-0.5">
                                    <div className="font-semibold text-[#1C1917]">
                                      {log.milestoneCode}: {log.milestoneName}
                                    </div>
                                    <div className="text-[#78716C]">{log.message}</div>
                                  </div>
                                  <div className="text-right shrink-0 space-y-0.5">
                                    <span className="text-[#C2410C] font-semibold block">{log.channels.join(' + ')}</span>
                                    <span className="text-[#A8A29E] text-[10px]">{log.timestamp}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* GANTT-STYLE MILESTONE TIMELINE VISUALIZATION (FEATURE EXPANSION) */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5DFD5] pb-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-[#C2410C]" />
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-[#1C1917]">
                        Project Milestone GANTT Schedule & Completion Targets
                      </h4>
                    </div>
                    <p className="text-xs text-[#78716C]">
                      Visualized across sprint weeks. Click any milestone bar to inspect its exact deliverables and sign-off criteria.
                    </p>
                  </div>

                  {/* View Mode Switcher */}
                  <div className="flex items-center gap-1.5 bg-[#F4EFEA] p-1 border border-[#D6CEBE]">
                    <button
                      type="button"
                      onClick={() => setTimelineViewMode('gantt')}
                      className={`min-h-[36px] px-3 py-1 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                        timelineViewMode === 'gantt'
                          ? 'bg-[#1C1917] text-[#FBF9F5]'
                          : 'text-[#57534E] hover:text-[#1C1917]'
                      }`}
                    >
                      <BarChart3 className="w-3.5 h-3.5" />
                      <span>GANTT Schedule</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTimelineViewMode('cards')}
                      className={`min-h-[36px] px-3 py-1 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                        timelineViewMode === 'cards'
                          ? 'bg-[#1C1917] text-[#FBF9F5]'
                          : 'text-[#57534E] hover:text-[#1C1917]'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Milestone Cards</span>
                    </button>
                  </div>
                </div>

                {/* VIEW 1: GANTT CHART */}
                {timelineViewMode === 'gantt' && (
                  <div className="bg-[#FBF9F5] border border-[#D6CEBE] p-4 md:p-6 space-y-6">
                    {/* GANTT Timeline Axis Headers */}
                    <div className="grid grid-cols-12 gap-2 text-[11px] font-mono-num text-[#78716C] border-b border-[#E5DFD5] pb-2">
                      <div className="col-span-4 md:col-span-3 uppercase">Milestone / Gate</div>
                      <div className="col-span-8 md:col-span-9 relative flex justify-between pr-2">
                        {Array.from({ length: activeProject.sprintWeekCount }).map((_, wIdx) => (
                          <span key={wIdx} className="hidden sm:inline">
                            WEEK 0{wIdx + 1}
                          </span>
                        ))}
                        <span className="sm:hidden font-semibold text-[#1C1917]">
                          Sprint Schedule Timeline (Weeks 1–{activeProject.sprintWeekCount})
                        </span>
                      </div>
                    </div>

                    {/* GANTT Rows */}
                    <div className="space-y-4 relative">
                      {/* Vertical "Today / Current Sprint Position" guide line */}
                      {activeProject.currentSprintPositionPercent < 100 && (
                        <div
                          style={{ left: `calc(25% + (75% * ${activeProject.currentSprintPositionPercent / 100}))` }}
                          className="hidden md:block absolute top-0 bottom-0 w-[1.5px] bg-[#C2410C] z-10 pointer-events-none"
                          title="Current Sprint Progression Line"
                        >
                          <div className="bg-[#C2410C] text-[#FBF9F5] text-[9px] font-mono-num px-1 py-0.5 rounded-none whitespace-nowrap absolute -top-5 -left-8">
                            TODAY SPRINT
                          </div>
                        </div>
                      )}

                      {activeProject.timelinePhases.map((phase) => {
                        const isSelected = highlightedMilestone?.id === phase.id;
                        return (
                          <div
                            key={phase.id}
                            onClick={() => setSelectedMilestoneId(phase.id)}
                            className={`grid grid-cols-12 gap-3 items-center p-3 transition-colors cursor-pointer border ${
                              isSelected
                                ? 'bg-[#F4EFEA] border-[#1C1917]'
                                : 'bg-[#FBF9F5] border-[#E5DFD5] hover:border-[#A8A29E]'
                            }`}
                          >
                            {/* Left Meta Slot */}
                            <div className="col-span-12 md:col-span-3 space-y-0.5">
                              <div className="flex items-center justify-between text-xs font-mono-num">
                                <span className="font-semibold text-[#C2410C]">{phase.phaseCode}</span>
                                <span className="text-[11px] text-[#78716C]">
                                  {phase.durationWorkingDays}d
                                </span>
                              </div>
                              <div className="text-xs font-semibold text-[#1C1917] truncate leading-tight">
                                {phase.name}
                              </div>
                              <div className="text-[11px] font-mono-num text-[#57534E]">
                                Est. Due: <strong className="text-[#1C1917]">{phase.estimatedCompletion}</strong>
                              </div>
                            </div>

                            {/* Right Horizontal GANTT Bar Track */}
                            <div className="col-span-12 md:col-span-9 relative h-8 bg-[#F4EFEA] border border-[#E5DFD5] flex items-center overflow-hidden">
                              {/* Background fine week ticks */}
                              <div className="absolute inset-0 grid grid-cols-6 pointer-events-none opacity-25">
                                {Array.from({ length: 6 }).map((_, i) => (
                                  <div key={i} className="border-r border-[#1C1917]" />
                                ))}
                              </div>

                              {/* The Phase GANTT Span Bar */}
                              <div
                                style={{
                                  left: `${phase.weekOffsetPercent}%`,
                                  width: `${phase.weekSpanPercent}%`,
                                }}
                                className={`absolute h-6 px-2.5 flex items-center justify-between text-[11px] font-mono-num transition-all ${
                                  phase.status === 'completed'
                                    ? 'bg-[#1C1917] text-[#FBF9F5]'
                                    : phase.status === 'current'
                                    ? 'bg-[#C2410C] text-[#FBF9F5]'
                                    : 'bg-[#E5DFD5] text-[#57534E] border border-dashed border-[#A8A29E]'
                                }`}
                              >
                                <span className="truncate text-[10px] font-medium">
                                  {phase.status === 'completed'
                                    ? '✓ Signed Off'
                                    : phase.status === 'current'
                                    ? `${phase.progressPercent}% Active`
                                    : 'Target Window'}
                                </span>
                                <span className="text-[9px] opacity-90 hidden sm:inline shrink-0">
                                  {phase.estimatedCompletion.split(',')[0]}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Milestone Spotlight Inspector Box */}
                    {highlightedMilestone && (
                      <div className="p-4 bg-[#F4EFEA] border border-[#1C1917] space-y-2 text-xs">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D6CEBE] pb-2 font-mono-num">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#C2410C]">{highlightedMilestone.phaseCode}:</span>
                            <span className="font-semibold text-[#1C1917]">{highlightedMilestone.name}</span>
                          </div>
                          <span
                            className={`px-2 py-0.5 text-[10px] font-semibold ${
                              highlightedMilestone.status === 'completed'
                                ? 'bg-[#15803D] text-white'
                                : highlightedMilestone.status === 'current'
                                ? 'bg-[#C2410C] text-white'
                                : 'bg-[#E5DFD5] text-[#57534E]'
                            }`}
                          >
                            {highlightedMilestone.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[#44403C]">
                          <div>
                            <span className="text-[#78716C] block">Schedule Window:</span>
                            <span className="font-mono-num font-semibold text-[#1C1917]">
                              {highlightedMilestone.startDate} → {highlightedMilestone.estimatedCompletion}
                            </span>
                          </div>
                          <div>
                            <span className="text-[#78716C] block">Key Stage Gate Output:</span>
                            <span className="font-semibold text-[#1C1917]">{highlightedMilestone.keyDeliverable}</span>
                          </div>
                          <div>
                            <span className="text-[#78716C] block">Sign-off Authority:</span>
                            <span className="text-[#1C1917]">{highlightedMilestone.signoffLead}</span>
                          </div>
                        </div>

                        {/* Status Transition Action */}
                        <div className="pt-3 border-t border-[#D6CEBE] flex flex-wrap items-center justify-between gap-3">
                          <div className="text-xs text-[#57534E]">
                            Milestone Status: <strong className="text-[#1C1917] font-mono-num uppercase font-semibold">{highlightedMilestone.status}</strong>
                          </div>
                          {highlightedMilestone.status !== 'completed' ? (
                            <button
                              type="button"
                              onClick={() => handleAdvanceMilestoneStatus(highlightedMilestone.id)}
                              className="min-h-[38px] px-3.5 py-1.5 bg-[#C2410C] hover:bg-[#9A3412] text-[#FBF9F5] text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Advance to Completed & Trigger Notification</span>
                            </button>
                          ) : (
                            <div className="flex items-center gap-1.5 text-xs font-mono-num text-[#15803D] font-semibold">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Milestone Gate Cleared & Notification Dispatched</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* VIEW 2: MILESTONE CARDS */}
                {timelineViewMode === 'cards' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {activeProject.timelinePhases.map((phase) => (
                      <div
                        key={phase.id}
                        className={`p-4 border text-xs space-y-2 flex flex-col justify-between ${
                          phase.status === 'completed'
                            ? 'bg-[#FBF9F5] border-[#15803D]'
                            : phase.status === 'current'
                            ? 'bg-[#F4EFEA] border-[#C2410C]'
                            : 'bg-[#FBF9F5] border-[#E5DFD5]'
                        }`}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between font-mono-num">
                            <span className="font-semibold text-[#C2410C]">{phase.phaseCode}</span>
                            {phase.status === 'completed' ? (
                              <span className="text-[#15803D] font-bold flex items-center gap-1 text-[11px]">
                                <CheckCircle2 className="w-3 h-3" /> Done
                              </span>
                            ) : phase.status === 'current' ? (
                              <span className="text-[#C2410C] font-bold flex items-center gap-1 text-[11px]">
                                <Clock className="w-3 h-3" /> {phase.progressPercent}%
                              </span>
                            ) : (
                              <span className="text-[#78716C] text-[11px]">Queued</span>
                            )}
                          </div>
                          <h5 className="font-semibold text-[#1C1917] leading-tight">{phase.name}</h5>
                          <p className="text-[11px] text-[#78716C]">{phase.keyDeliverable}</p>
                        </div>

                        <div className="pt-3 border-t border-[#E5DFD5] space-y-2">
                          <div className="text-[11px] font-mono-num space-y-0.5">
                            <div className="text-[#57534E]">Start: {phase.startDate}</div>
                            <div className="text-[#1C1917] font-semibold">
                              Est. Delivery: {phase.estimatedCompletion}
                            </div>
                          </div>

                          {phase.status !== 'completed' && (
                            <button
                              type="button"
                              onClick={() => handleAdvanceMilestoneStatus(phase.id)}
                              className="w-full min-h-[34px] px-2 py-1 bg-[#1C1917] hover:bg-[#C2410C] text-[#FBF9F5] text-[11px] font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                            >
                              <Check className="w-3 h-3" />
                              <span>Mark Completed & Alert</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Production Deliverables Download Locker */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-2">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-[#C2410C]" />
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-[#1C1917]">
                      Production Master Deliverables & Artifact Locker
                    </h4>
                  </div>
                  <span className="text-xs font-mono-num text-[#78716C]">
                    ISO 15930 & Fogra39/51 Certified
                  </span>
                </div>

                <div className="divide-y divide-[#E5DFD5] border border-[#E5DFD5] bg-[#FBF9F5]">
                  {activeProject.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-semibold text-[#1C1917]">{item.name}</div>
                        <div className="text-[#78716C] font-mono-num">
                          Format: {item.format} {item.fileSize && `· ${item.fileSize}`}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {item.status === 'Ready' ? (
                          <button
                            type="button"
                            onClick={() => handleDownloadAsset(item.name)}
                            disabled={simulatedDownload === item.name}
                            className="min-h-[40px] px-3.5 py-1.5 bg-[#1C1917] hover:bg-[#C2410C] text-[#FBF9F5] text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>
                              {simulatedDownload === item.name ? 'Downloading...' : 'Download Master'}
                            </span>
                          </button>
                        ) : (
                          <span className="px-3 py-1 bg-[#F4EFEA] text-[#78716C] border border-[#D6CEBE] text-[11px] font-mono-num">
                            {item.status === 'In Progress' ? 'In Vector QA' : 'Awaiting Stage Gate'}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Ledger & Invoicing */}
              <div className="p-5 bg-[#F4EFEA] border border-[#D6CEBE] space-y-3 text-xs">
                <div className="font-semibold uppercase tracking-wider text-[#1C1917] font-mono-num border-b border-[#E5DFD5] pb-2 flex justify-between">
                  <span>Treasury & Billing Ledger</span>
                  <span className="text-[#C2410C]">Invoice #{activeProject.financials.invoiceRef}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <span className="text-[#78716C] block">Total Scope Investment:</span>
                    <span className="font-semibold text-[#1C1917] font-mono-num text-sm">
                      {activeProject.financials.totalEstimate}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#78716C] block">50% Commencement Deposit:</span>
                    <span className="font-semibold text-[#15803D] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Paid ({activeProject.financials.depositDate})
                    </span>
                  </div>
                  <div>
                    <span className="text-[#78716C] block">50% Final Sign-off Balance:</span>
                    <span className="font-semibold text-[#1C1917]">
                      {activeProject.financials.balancePaid ? (
                        <span className="text-[#15803D]">Fully Settled</span>
                      ) : (
                        <span>Due on Final Deliverable Approval</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : searched ? (
            <div className="p-8 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-[#C2410C] mx-auto" />
              <h3 className="text-base font-semibold text-[#1C1917]">
                Reference Number Not Found in Active Sprint Queue
              </h3>
              <p className="text-xs text-[#57534E] max-w-md mx-auto">
                Please verify your reference number formatted as <code>AK-GH-2026-XXXX</code> or contact our Accra direct desk at commissions@apexkoncepts.com.gh.
              </p>
            </div>
          ) : null}
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 z-20 bg-[#F4EFEA] border-t border-[#D6CEBE] px-5 py-3.5 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[#57534E]">
            Direct Project Desk: commissions@apexkoncepts.com.gh · +233 (0) 30 278 4910
          </span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2 text-xs font-medium bg-[#1C1917] text-[#FBF9F5] hover:bg-[#C2410C] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Close Portal
          </button>
        </div>
      </div>
    </div>
  );
};
