"use client";

import { Inter, Press_Start_2P } from "next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";

const pressstart2p = Press_Start_2P({ weight: "400", subsets: ["latin"] });
const inter = Inter({ weight: "400", subsets: ["latin"] });

const messages = [
  "[  OK  ] Booting ShadowOS Kernel 5.13.0-shadow (x86_64)...",
  "[  OK  ] Initializing virtual memory manager...",
  "[  OK  ] Detected CPU: 8-Core ShadowEngine 3.2GHz",
  "[  OK  ] Enabling ShadowSecure (SSP)...",
  "[  OK  ] Initializing hardware abstraction layer...",
  "[  OK  ] Mounting root filesystem at /dev/sda1",
  "[  OK  ] Mounting /boot",
  "[  OK  ] Mounting /home",
  "[  OK  ] Starting udev daemon...",
  "[  OK  ] Detecting hardware devices...",
  "[  OK  ] Initializing device manager...",
  "[  OK  ] Loading kernel modules...",
  "[  OK  ] Loaded module: shadow-gpu",
  "[  OK  ] Loaded module: shadow-sound",
  "[  OK  ] Activating swap partition...",
  "[  OK  ] Swap active on /dev/sda2 (2GiB)",
  "[  OK  ] Setting hostname to 'shadowos'",
  "[  OK  ] Starting system logging service...",
  "[  OK  ] systemd-journald started.",
  "[  OK  ] Starting D-Bus system message bus...",
  "[  OK  ] dbus-daemon running with PID 201",
  "[  OK  ] Applying ShadowOS security policies...",
  "[  OK  ] ShadowGuard enabled. Status: ENFORCING",
  "[  OK  ] Initializing network interfaces...",
  "[  OK  ] Bringing up interface enp0s3...",
  "[  OK  ] Requesting DHCP lease...",
  "[FAILED] uhhh hi! have a nice day",
  "[  OK  ] Lease acquired: 192.168.1.42",
  "[  OK  ] Gateway: 192.168.1.1 | DNS: 8.8.8.8",
  "[  OK  ] Starting NTP service...",
  "[  OK  ] System clock synchronized to time server.",
  "[  OK  ] Starting user login services...",
  "[  OK  ] shadow-root.service started.",
  "[  OK  ] Mounting encrypted user volumes...",
  "[  OK  ] /home/user unlocked and mounted.",
  "[  OK  ] Starting Shadow Audio Manager...",
  "[FAILED] Failed to load pulse-audio daemon. Fallback active.",
  "[  OK  ] Starting graphical target (Wayland)...",
  "[  OK  ] Wayland display server running on :0",
  "[  OK  ] Starting Shadow Display Manager (SDM)...",
  "[  OK  ] SDM running as PID 389",
  "[  OK  ] Launching ShadowOS Session Manager...",
  "[  OK  ] Session environment loaded for user: user",
  "[FAILED] Smoke but",
  "[  OK  ] Boot completed in 3.8s",
  "[  OK  ] Welcome to ShadowOS.",
];

export default function Home() {
  const [visibleMessages, setVisibleMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const hasLogged = localStorage.getItem('hasLogged');
    if (hasLogged === "true") {
      router.push('/system');
    }
  }, [router]);

  useEffect(() => {
  let current = 0;

  const showNextMessage = () => {
    if (current < messages.length) {
      setVisibleMessages((prev) => [...prev, messages[current]]);
      current++;

      const delay = current === 15 ? 6000 : 300; // ⏸️ pausa de 10s no 15º
      setTimeout(showNextMessage, delay);
    } else {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  showNextMessage();
  }, []);

  useEffect(() => {
    if (loading) return;

    const timeout = setTimeout(() => {
      localStorage.setItem('hasLogged', "true");
      router.push('/system');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [loading, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-sm font-mono px-6 py-10">
        <div className="space-y-1">
          {visibleMessages
            .filter(Boolean)
            .map((msg, i) => (
              <p key={i} className="text-white font-vga">
                {msg.split(/(\[\s*(?:OK|FAILED)\s*\])/).map((part, index) => {
                  if (/\[\s*OK\s*\]/.test(part)) {
                    return (
                      <span key={index} className="text-green-400">
                        {part}
                      </span>
                    );
                  } else if (/\[\s*FAILED\s*\]/.test(part)) {
                    return (
                      <span key={index} className="text-red-500">
                        {part}
                      </span>
                    );
                  }
                  return <span key={index}>{part}</span>;
                })
                }
              </p>
            ))}
        </div>
      </main>
    );
  }

  return (
    <main className="flex justify-center items-center min-h-screen bg-[#0B1522] p-4">
      <div className="flex flex-col items-center justify-center w-[600px] h-[480px] bg-[#0E1A2B] rounded-2xl gap-6 shadow-lg">
        <div className="flex flex-col items-center justify-center gap-4 w-[400px] h-[320px] bg-[#0C1728] border-2 border-[#0C1728] rounded-xl p-4">
          <Image
            src="/avatar.png"
            alt="Avatar"
            width={200}
            height={120}
            className="object-contain"
          />
          <h1 className={`text-3xl text-white ${pressstart2p.className}`}>
            ShadowOS
          </h1>
        </div>
        <p className={`text-lg text-white ${inter.className}`}>
          Welcome to ShadowOS
        </p>
      </div>
    </main>
  );
}
