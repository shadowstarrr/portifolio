"use client"

import HeaderSystem from '@/components/ui/headerSystem';
import { useRouter } from "next/navigation";
import File from '@/components/ui/File';
import { useEffect } from "react";

export default function SystemPage() {
    const router = useRouter();

    useEffect(() => {
        const hasLogged = localStorage.getItem('hasLogged');
        if (!hasLogged || hasLogged !== "true") {
            router.push('/');
        };
    }, []);

    return (
        <>
            <HeaderSystem />
            <div className='flex flex-col p-4 gap-5'>
                <File iconName="credits.txt" iconImage="notepad.png" textSize={14} preview="<div class='text-2xl'><h1 class='text-white'>Yay! finalmente meu <span class='text-red-600 font-extrabold'>PORTIFOLIO</span></h1><br><h1>ShadowStar - Developer Frontend</h1> <h1>Kyanaston - Dicas btw</h1></div>" width={65} height={65} name={`credits.txt`} />

                <File iconName="whoisme.txt" iconImage="notepad.png" textSize={14} preview={`
                <div class='text-2xl'>
                <h1>Howdy! sou Shadowstar, um programador fullstack! (mais puxado pro backend...)</h1>
                <br>
                <div class='flex gap-2'>
                <h1>Linguagens que sei: <h1>
                <di class='flex gap-1'>

                <img src="https://cdn.simpleicons.org/javascript/F7DF1E" width="40" alt="JavaScript logo" />
                <img src="https://cdn.simpleicons.org/typescript/3178C6" width="40" alt="Typescript logo" />
                <img src="https://cdn.simpleicons.org/kotlin/7F52FF" width="40" alt="Kotlin logo" />
                <img src="https://cdn.simpleicons.org/php/777BB4" width="70" alt="Php logo" />

                </div>
                </div>
                </div>`
                } width={65} height={65} name={`whoitsme.txt`} />

                <File iconName="mysocialmedias.txt" iconImage="notepad.png" textSize={14} preview={`
                    <div class='text-2xl flex gap-5'>
                    <a href='https://github.com/shadowstarrr' ><img src="https://cdn.simpleicons.org/github/181717" width="60" alt="Github link" /></a>
                    <a href='https://discord.com/users/1271672127376064586' ><img src="https://cdn.simpleicons.org/discord/5865F2" width="60" alt="Discord link" /></a>
                    <a href='https://www.roblox.com/pt/users/12994001/profile?' ><img src="https://cdn.simpleicons.org/roblox/000000" width="60" alt="JavaScript link" /></a>
                    
                    </div>`
                    } width={65} height={65} name={`mysocialmedias.txt`} />
            </div>
        </>
    )
};