"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Coffee, Globe, Leaf } from "lucide-react"
import Image from "next/image"
import ColorPaletteDev from "@/components/dev/ColorPaletteDev"

const translations = {
  en: {
    welcome: "Welcome to Baan Rai Nai Fun",
    subtitle: "Your Dream Garden Home in the Heart of Chiang Mai",
    description: "Experience authentic Thai hospitality surrounded by lush gardens and mountain views",
    ourStory: "Our Story",
    cafeRestaurant: "Cafe & Restaurant",
    homeStay: "Home Stay",
    ourStoryDesc: "Discover the heart of our family garden and the love we put into every guest's experience",
    cafeDesc: "Savor farm-to-table Thai cuisine and locally roasted coffee in our garden setting",
    homeStayDesc: "Rest peacefully in our cozy rooms surrounded by nature's tranquility",
  },
  th: {
    welcome: "ยินดีต้อนรับสู่บ้านไร่ในฝัน",
    subtitle: "บ้านสวนในฝันของคุณ ใจกลางเชียงใหม่",
    description: "สัมผัสการต้อนรับแบบไทยแท้ ท่ามกลางสวนเขียวขจีและวิวภูเขา",
    ourStory: "เรื่องราวของเรา",
    cafeRestaurant: "คาเฟ่ & ร้านอาหาร",
    homeStay: "โฮมสเตย์",
    ourStoryDesc: "ค้นพบหัวใจของสวนครอบครัวเราและความรักที่เราใส่ใจในทุกประสบการณ์ของแขก",
    cafeDesc: "ลิ้มรสอาหารไทยจากสวนสู่จาน และกาแฟคั่วท้องถิ่นในบรรยากาศสวน",
    homeStayDesc: "พักผ่อนอย่างสงบในห้องพักอบอุ่น ท่ามกลางความเงียบสงบของธรรมชาติ",
  },
}

export default function HomePage() {
  const [language, setLanguage] = useState<"en" | "th">("en")
  const t = translations[language]

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "th" : "en")
  }

  return (
    <div className="min-h-screen bg-background font-warm">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-muted sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary rounded-full">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-primary font-serif">Baan Rai Nai Fun</h1>
                <p className="text-xs text-secondary hidden sm:block">บ้านไร่ในฝัน</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2 border-secondary text-primary hover:bg-muted"
            >
              <Globe className="h-4 w-4" />
              {language === "en" ? "ไทย" : "EN"}
            </Button>
          </nav>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="py-20 md:py-28 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto min-h-[340px] md:min-h-[420px] flex flex-col justify-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-primary font-serif leading-tight">{t.welcome}</h2>
            <p className="text-xl md:text-2xl text-secondary mb-4 font-medium">{t.subtitle}</p>
            <p className="text-lg text-accent max-w-2xl mx-auto leading-relaxed">{t.description}</p>

            {/* Decorative elements */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-secondary"></div>
              <Coffee className="h-6 w-6 text-secondary" />
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-secondary"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Our Story Card */}
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group bg-card border-muted hover:border-secondary">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={process.env.NEXT_PUBLIC_BASE_PATH ? `${process.env.NEXT_PUBLIC_BASE_PATH}/story.jpg` : "/baanrainaifun/story.jpg"}
                  alt="Our Story"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4 text-primary font-serif">{t.ourStory}</h3>
                <p className="text-muted-foreground leading-relaxed">{t.ourStoryDesc}</p>
              </CardContent>
            </Card>

            {/* Cafe & Restaurant Card */}
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group bg-card border-muted hover:border-secondary">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={process.env.NEXT_PUBLIC_BASE_PATH ? `${process.env.NEXT_PUBLIC_BASE_PATH}/cafe.jpg` : "/baanrainaifun/cafe.jpg"}
                  alt="Cafe & Restaurant"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4 text-primary font-serif">{t.cafeRestaurant}</h3>
                <p className="text-muted-foreground leading-relaxed">{t.cafeDesc}</p>
              </CardContent>
            </Card>

            {/* Home Stay Card */}
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group bg-card border-muted hover:border-secondary">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={process.env.NEXT_PUBLIC_BASE_PATH ? `${process.env.NEXT_PUBLIC_BASE_PATH}/homestay.jpg` : "/baanrainaifun/homestay.jpg"}
                  alt="Home Stay"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4 text-primary font-serif">{t.homeStay}</h3>
                <p className="text-muted-foreground leading-relaxed">{t.homeStayDesc}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted border-t border-muted py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="p-2 bg-primary rounded-full">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-bold text-primary font-serif text-lg">Baan Rai Nai Fun</span>
                <p className="text-sm text-secondary">บ้านไร่ในฝัน</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground mb-1">© 2024 Baan Rai Nai Fun. All rights reserved.</p>
              <p className="text-xs text-accent">Chiang Mai, Thailand</p>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Dev Color Palette Selector */}
      <ColorPaletteDev />
    </div>
  )
}
