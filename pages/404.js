// pages/404.js
import React from 'react'
import { Footer } from '../components/sections/footer'
import { NextSeo } from 'next-seo'
import Layout from '../components/layout/'
import Header from '../components/header/header'
import LinkedButton from '../components/linked-button'

export default function Custom404() {
  return (
    <Layout>
      <NextSeo
        title={'Hata'}
        titleTemplate={'%s'}
        description="Böyle bir şey yok"
      />
      <Header title={'Böyle bir şey yok'} />

      <div className="h-screen flex items-center">
        <div className="container flex flex-col md:flex-row items-center justify-center px-5">
          <div className="max-w-md">
            <div className="text-5xl font-bold pb-12"> ⚠ HATA ⚠</div>
            <p className="text-2xl md:text-3xl font-light leading-normal font-sans pb-4">
              Üzgünüm, böyle bir sayfa mevcut değil.{' '}
            </p>
            <p className="mb-8 font-sans pb-8">
              Bütün içeriklere göz atmak istiyorsanız, ana sayfadan keşfetmeye başlayabilirsiniz.
            </p>

            <LinkedButton href={'/'}>Ana Sayfaya Dön</LinkedButton>
          </div>
        </div>
      </div>

      <Footer />
    </Layout>
  )
}
