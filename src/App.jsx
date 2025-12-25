import { useState } from "react";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import TextType from "./components/TextType";
import GridMotion from "./components/GridMotion";

function App() {
  const [step, setStep] = useState("review"); // 'review' or 'roulette'
  const [review, setReview] = useState("");
  const [result, setResult] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);


  const handleSubmitReview = () => {
    if (review.trim()) {
      setStep("roulette");
      setIsSpinning(true);
      // Simulate spinning time
      setTimeout(() => {
        const win = Math.random() > 0.5;
        const newResult = win ? "Win" : "Lose";
        setResult(newResult);
        setIsSpinning(false);
      }, 3000); // 3 seconds spin
    }
  };

  const reset = () => {
    setStep("review");
    setReview("");
    setResult(null);
    setIsSpinning(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle background animation */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <GridMotion gradientColor="#6366f1" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-primary">
              <TextType
                text={["Welcome to Our Platform", "Try Your Luck Today"]}
                typingSpeed={80}
                deletingSpeed={40}
                pauseDuration={1500}
                loop={true}
                showCursor={true}
                cursorCharacter="|"
                className="text-center"
              />
            </div>
            <p className="text-lg text-muted-foreground">
              Leave a review to try your luck with our roulette wheel!
            </p>
          </div>

          {/* Review Form - Step 1 */}
          {step === "review" && (
            <div className="space-y-4">
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Your Review:
                </label>
                <Textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={4}
                  className="w-full"
                />
              </div>
              <Button
                onClick={handleSubmitReview}
                disabled={!review.trim()}
                className="w-full"
              >
                Submit Review & Spin Roulette
              </Button>
            </div>
          )}

          {/* Roulette Wheel - Step 2 */}
          {step === "roulette" && (
            <div className="text-center space-y-8">
              {isSpinning && (
                <>
                  <h2 className="text-2xl font-semibold text-foreground">
                    🎰 Spin the Wheel! 🎰
                  </h2>
                  <div className="relative">
                    <div
                      className="w-64 h-64 mx-auto rounded-full border-8 border-primary flex items-center justify-center text-6xl font-bold relative overflow-hidden shadow-lg"
                      style={{
                        background: `conic-gradient(from 0deg, hsl(142.1 76.2% 36.3%) 0deg 90deg, hsl(0 84.2% 60.2%) 90deg 180deg, hsl(142.1 76.2% 36.3%) 180deg 270deg, hsl(0 84.2% 60.2%) 270deg 360deg)`,
                        transform: isSpinning ? "rotate(0deg)" : "rotate(0deg)",
                        transition: isSpinning
                          ? "transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                          : "none",
                        animation: isSpinning
                          ? "spin-roulette 3s ease-out forwards"
                          : "none",
                      }}
                    >
                      {/* Win sections */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-bold text-lg transform -rotate-45">
                          WIN
                        </span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center transform rotate-45">
                        <span className="text-white font-bold text-lg">WIN</span>
                      </div>
                      {/* Lose sections */}
                      <div className="absolute inset-0 flex items-center justify-center transform rotate-135">
                        <span className="text-white font-bold text-lg">LOSE</span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center transform -rotate-135">
                        <span className="text-white font-bold text-lg">LOSE</span>
                      </div>
                      {/* Pointer */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-primary"></div>
                    </div>
                  </div>
                </>
              )}

              {!isSpinning && result && (
                <div className="space-y-6">
                  <div className={`bg-gradient-to-br ${
                    result === "Win"
                      ? "from-green-50 to-emerald-100 border-green-200"
                      : "from-orange-50 to-red-100 border-red-200"
                  } p-8 rounded-2xl border-2 shadow-xl relative overflow-hidden`}>
                    {/* Subtle background pattern */}
                    <div className={`absolute inset-0 opacity-10 ${
                      result === "Win"
                        ? "bg-gradient-to-br from-green-400 to-emerald-600"
                        : "bg-gradient-to-br from-orange-400 to-red-600"
                    }`}></div>

                    <div className="relative z-10 text-center space-y-4">
                      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
                        result === "Win"
                          ? "bg-green-500"
                          : "bg-red-500"
                      } shadow-lg animate-bounce`}>
                        <span className="text-3xl text-white">
                          {result === "Win" ? "🏆" : "🎯"}
                        </span>
                      </div>

                      <div>
                        <h3 className={`text-4xl font-bold mb-2 ${
                          result === "Win" ? "text-green-800" : "text-red-800"
                        }`}>
                          You {result === "Win" ? "WON!" : "LOST!"}
                        </h3>
                        <p className={`text-lg ${
                          result === "Win" ? "text-green-700" : "text-red-700"
                        }`}>
                          {result === "Win"
                            ? "🎉 Congratulations! You're a winner! 🎉"
                            : "💪 Better luck next time! Try again. 💪"}
                        </p>
                      </div>

                      <Button
                        onClick={reset}
                        className={`px-8 py-3 text-lg font-semibold transition-all duration-300 ${
                          result === "Win"
                            ? "bg-green-600 hover:bg-green-700 hover:scale-105"
                            : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
                        } text-white rounded-full shadow-lg`}
                      >
                        🎮 Play Again
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
