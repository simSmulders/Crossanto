import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">Crossanto</h1>
          <nav className="flex gap-4">
            <Button variant="ghost">Learn</Button>
            <Button variant="ghost">Practice</Button>
            <Button variant="ghost">Games</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Learn French the Fun Way
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master French vocabulary through interactive exercises, fill-in-the-blank sentences, and engaging games.
          </p>
          <Button size="lg" className="mt-8">
            Start Learning
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📚</span>
                Vocabulary
              </CardTitle>
              <CardDescription>
                Learn new French words with categories like food, colors, family, and more.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Browse Words
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">✏️</span>
                Fill in the Blank
              </CardTitle>
              <CardDescription>
                Practice with real French sentences and fill in the missing words.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Start Practice
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🎮</span>
                Games
              </CardTitle>
              <CardDescription>
                Make learning fun with matching games and timed challenges.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Play Games
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats Preview */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Your Progress</h3>
          <div className="flex justify-center gap-12">
            <div>
              <p className="text-4xl font-bold text-blue-600">50+</p>
              <p className="text-gray-600">Words Available</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-600">5</p>
              <p className="text-gray-600">Categories</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-purple-600">0</p>
              <p className="text-gray-600">Words Learned</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8 text-center text-gray-500">
        <p>Crossanto - Learn French with joy!</p>
      </footer>
    </div>
  )
}

export default App
