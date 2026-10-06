"use client"
import Image from "next/image"
import { UserRound } from "lucide-react"
import Squares from "./blocks/Backgrounds/Squares"
import { useTranslations } from 'next-intl'

// Replace null with a local photo path, such as /images/team/partner-1.jpg.
const profilePhotos: Record<"first" | "second", string | null> = {
  first: null,
  second: null,
}

const AboutUs = () => {
  const t = useTranslations('about');
  const profiles = [
    { id: "first", name: t('members.first.name'), role: t('members.first.role'), biography: t('members.first.biography'), photoSrc: profilePhotos.first },
    { id: "second", name: t('members.second.name'), role: t('members.second.role'), biography: t('members.second.biography'), photoSrc: profilePhotos.second },
  ];
  
  return (
    <section id="about" className="py-24 relative min-h-[60vh] flex items-center justify-center">
      <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true">
      <Squares 
        speed={0.2} 
        squareSize={40}
        direction='diagonal'
        borderColor='#1A5EFF'
        hoverFillColor='#222'
        />
      </div>
      <div className="w-full max-w-[1128px] mx-auto px-6 relative z-30">
        <div className="mx-auto max-w-[760px]">
          <h2 className="text-center text-3xl font-bold text-gray-100 sm:text-4xl">{t('title')}</h2>
          <p className="text-center mt-4 font-light text-lg leading-8 text-gray-200">{t('description')}</p>
          <p className="text-center mt-4 text-sm leading-6 text-gray-300">{t('aiNote')}</p>
        </div>
        <p className="mt-10 text-center text-sm text-gray-300">{t('placeholderNotice')}</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {profiles.map((profile) => (
            <article key={profile.id} className="flex min-w-0 flex-col items-center gap-6 rounded-2xl border border-blue-600/20 bg-background/90 p-6 lg:flex-row lg:items-start" aria-labelledby={`partner-${profile.id}`}>
              <div className="relative aspect-[4/5] w-48 flex-shrink-0 overflow-hidden rounded-xl border border-blue-600/20 bg-[#111827] lg:w-52">
                {profile.photoSrc ? (
                  <Image src={profile.photoSrc} alt={t('photoAlt', { name: profile.name })} fill sizes="(min-width: 1024px) 208px, 192px" className="object-cover" />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-4 px-4 text-gray-300" role="img" aria-label={t('photoPlaceholder')}>
                    <UserRound className="h-10 w-10 text-blue-400" aria-hidden="true" />
                    <span className="text-center text-sm">{t('photoPlaceholder')}</span>
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1 text-center lg:text-left">
                <h3 id={`partner-${profile.id}`} className="text-xl font-semibold text-gray-100">{profile.name}</h3>
                <p className="mt-2 text-sm leading-6 text-blue-300">{profile.role}</p>
                <p className="mt-4 text-base leading-7 text-gray-300">{profile.biography}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutUs

