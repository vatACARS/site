import Head from 'next/head'
import { ArrowRight, Blocks, Download, ExternalLink, Github, Shield, Terminal, Zap } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Header, Footer } from '../components/layout/header-footer'
import { useRouter } from 'next/router'

const features = [
    {
      title: "Simple Integration",
      description: "Seamlessly integrates with your existing vatSys workflow with minimal setup required. Built for maximum compatibility and ease of use.",
      icon: Terminal,
      position: "right"
    },
    {
      title: "Advanced Server Integration",
      description: "Connect to the hoppies or vatACARS servers with ease, So you can get typing to pilots quickly.",
      icon: Zap,
      position: "left"
    },
    {
      title: "Native Performance",
      description: "Built specifically for vatSys, ensuring optimal performance and reliability. Experience seamless operation with minimal resource usage.",
      icon: Shield,
      position: "right"
    },
    {
      title: "Customizable Interface",
      description: "Tailor your experience with a range of customization options. Personalize your setup to suit your workflow and preferences.",
      icon: Blocks,
      position: "left"
    }
  ]

export default function Home() {

    const router = useRouter();

    const handledocs = () => {
        router.push('/docs');
    };

  return (
    <>
      <Head>
        <title>vatACARS - Advanced ACARS Integration</title>
        <meta name="description" content="Streamline your virtual ATC experience with vatACARS" />
      </Head>

      <div className="min-h-screen bg-zinc-950 text-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative min-h-[90vh] flex items-center">
            <div className="container relative mx-auto px-4 py-32">
              <div className="max-w-4xl mx-auto text-center">

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 text-white">
                  The Advanced ACARS Solution
                </h1>

                <p className="text-xl text-zinc-400 mb-12 leading-relaxed max-w-2xl mx-auto">
                  Enhance your virtual ATC experience with seamless ACARS integration. 
                  Built by controllers, for controllers.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <Button 
                    size="lg"
                    className="bg-blue-500 hover:bg-blue-600 text-white transition-all text-lg h-14 px-8"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-zinc-600 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-600 hover:border-zinc-700 transition-all text-lg h-14 px-8"
                    onClick={handledocs}
                  >
                    View Documentation
                  </Button>
                </div>
              </div>
            </div>
          </section>

         {/* Features Section */}
         <section className="py-32">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto space-y-32">
                {features.map((feature, index) => (
                  <div 
                    key={feature.title}
                    className={`flex flex-col ${feature.position === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16`}
                  >
                    <div className="flex-1">
                      <div className={`flex items-center gap-4 mb-6 ${feature.position === 'right' ? 'md:justify-end' : ''}`}>
                        <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                          <feature.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-medium text-white">
                          {feature.title}
                        </h3>
                      </div>
                      <p className={`text-xl text-zinc-400 leading-relaxed ${feature.position === 'right' ? 'md:text-right' : ''}`}>
                        {feature.description}
                      </p>
                    </div>
                    <div className="flex-1">
                      <div className="aspect-square rounded-3xl bg-zinc-900 border border-zinc-800">
                        <div className="flex items-center justify-center h-full">
                          <img 
                            src={`/img/feature-${index + 1}.png`}
                            alt={feature.title}
                            className="max-h-full max-w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-32">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="relative p-12 lg:p-16 rounded-3xl bg-zinc-900 border border-zinc-800">
                  <div className="relative flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex-1">
                      <h2 className="text-3xl lg:text-4xl font-semibold mb-4">Ready to get started?</h2>
                      <p className="text-zinc-400 text-lg">Download vatACARS and transform your controlling experience today.</p>
                    </div>
                    <div className="flex gap-6">
                      <Button 
                        size="lg"
                        className="bg-blue-500 hover:bg-blue-600 text-white transition-all h-14 px-8 text-lg"
                      >
                        <Download className="mr-2 h-5 w-5" />
                        Download
                      </Button>
                      <Button 
                        size="lg"
                        variant="outline"
                        className="border-zinc-600 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-600 hover:border-zinc-700 transition-all h-14 px-8 text-lg"
                      >
                        <Github className="mr-2 h-5 w-5" />
                        GitHub
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}