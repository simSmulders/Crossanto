import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import type { Category, Sentence } from "./types/index";
import { useToast } from "./components/ui/use-toast";

type ExerciseState = "category-select" | "practicing" | "results";

function Practice() {
    const { toast } = useToast();

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [sentences, setSentences] = useState<Sentence[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState<{ correct: boolean; correctAnswer: string } | null>(null);
    const [score, setScore] = useState(0);
    const [state, setState] = useState<ExerciseState>("category-select");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        try {
            setIsLoading(true);
            const response = await fetch("/api/vocabulary/categories");
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
            setCategories(result);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to load categories",
            });
        } finally {
            setIsLoading(false);
        }
    }

    async function startPractice(category: Category) {
        try {
            setIsLoading(true);
            setSelectedCategory(category);
            const response = await fetch(`/api/exercises/fill-blank?categoryId=${category.id}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result: Sentence[] = await response.json();

            if (result.length === 0) {
                toast({
                    variant: "destructive",
                    title: "No exercises",
                    description: `No fill-in-the-blank exercises available for "${category.name}" yet.`,
                });
                return;
            }

            // Shuffle sentences
            const shuffled = result.sort(() => 0.5 - Math.random());
            setSentences(shuffled);
            setCurrentIndex(0);
            setScore(0);
            setAnswer("");
            setFeedback(null);
            setState("practicing");
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to load exercises",
            });
        } finally {
            setIsLoading(false);
        }
    }

    async function checkAnswer() {
        if (!answer.trim()) return;
        const sentence = sentences[currentIndex];
        try {
            const response = await fetch("/api/exercises/fill-blank/check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sentenceId: sentence.id, answer: answer.trim() }),
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
            setFeedback(result);
            if (result.correct) {
                setScore((s) => s + 1);
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to check answer",
            });
        }
    }

    function nextQuestion() {
        if (currentIndex + 1 >= sentences.length) {
            setState("results");
        } else {
            setCurrentIndex((i) => i + 1);
            setAnswer("");
            setFeedback(null);
        }
    }

    function backToCategories() {
        setState("category-select");
        setSelectedCategory(null);
        setSentences([]);
        setFeedback(null);
        setAnswer("");
        setScore(0);
    }

    function buildSentenceWithBlank(sentence: Sentence): string {
        const words = sentence.french.split(/\s+/);
        // Replace the word at blankIndex with "______"
        const targetWord = sentence.word.french;
        // For multi-word targets (like "le pain"), count how many words to blank out
        const targetWords = targetWord.split(/\s+/);
        const blanked = [...words];
        for (let i = 0; i < targetWords.length && sentence.blankIndex + i < blanked.length; i++) {
            blanked[sentence.blankIndex + i] = i === 0 ? "______" : "";
        }
        return blanked.filter(Boolean).join(" ");
    }

    // Category selection screen
    if (state === "category-select") {
        return (
            <div className="flex flex-col items-center">
                <div className="flex flex-row p-3 w-full gap-[250px]">
                    <Button className="flex w-[100px]" variant="default" onClick={() => history.back()}>Back</Button>
                    <h1 className="flex flex-4">Practice by Category</h1>
                </div>
                {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading categories...</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="text-gray-600 mb-6 px-4">Choose a category to practice fill-in-the-blank exercises.</p>
                        <div className="flex flex-row flex-wrap justify-center">
                            {categories.map((cat) => (
                                <Card
                                    key={cat.id}
                                    className="hover:shadow-lg transition-shadow cursor-pointer w-[300px] m-3"
                                    onClick={() => startPractice(cat)}
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <span className="text-2xl">{cat.icon}</span>
                                            {cat.name}
                                        </CardTitle>
                                        <CardDescription>{cat.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-500">{cat._count.words} words</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </>
                )}
            </div>
        );
    }

    // Results screen
    if (state === "results") {
        return (
            <div className="flex flex-col items-center p-6">
                <Card className="w-full max-w-lg">
                    <CardHeader>
                        <CardTitle>Practice Complete!</CardTitle>
                        <CardDescription>
                            Category: {selectedCategory?.name}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-5xl font-bold text-blue-600 mb-2">
                            {score}/{sentences.length}
                        </p>
                        <p className="text-gray-600 mb-6">
                            {score === sentences.length
                                ? "Perfect score!"
                                : score >= sentences.length / 2
                                ? "Good job! Keep practicing."
                                : "Keep going, you'll get better!"}
                        </p>
                        <div className="flex gap-3 justify-center">
                            <Button variant="outline" onClick={backToCategories}>
                                Choose Another Category
                            </Button>
                            <Button onClick={() => startPractice(selectedCategory!)}>
                                Try Again
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Practicing screen
    const currentSentence = sentences[currentIndex];
    return (
        <div className="flex flex-col items-center p-6">
            <div className="flex flex-row items-center w-full max-w-lg mb-6">
                <Button variant="outline" onClick={backToCategories}>Back to Categories</Button>
                <div className="ml-auto text-sm text-gray-500">
                    {currentIndex + 1} / {sentences.length} &middot; Score: {score}
                </div>
            </div>

            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-lg">{selectedCategory?.icon}</span>
                        {selectedCategory?.name}
                    </CardTitle>
                    <CardDescription>Fill in the missing word</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-lg font-medium mb-2">
                        {buildSentenceWithBlank(currentSentence)}
                    </p>
                    <p className="text-sm text-gray-500 mb-4 italic">
                        {currentSentence.english}
                    </p>

                    {!feedback ? (
                        <div className="flex gap-2">
                            <Input
                                placeholder="Type the missing word..."
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
                                autoFocus
                            />
                            <Button onClick={checkAnswer} disabled={!answer.trim()}>
                                Check
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <div className={`p-3 rounded-md mb-4 ${feedback.correct ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                {feedback.correct ? (
                                    <p className="font-medium">Correct!</p>
                                ) : (
                                    <p>
                                        <span className="font-medium">Not quite.</span>{" "}
                                        The answer is: <strong>{feedback.correctAnswer}</strong>
                                    </p>
                                )}
                            </div>
                            <Button className="w-full" onClick={nextQuestion}>
                                {currentIndex + 1 >= sentences.length ? "See Results" : "Next Question"}
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default Practice;
