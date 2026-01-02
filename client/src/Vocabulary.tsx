import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import type { Category, Word } from "./types/index";
import { useToast } from "./components/ui/use-toast";

function Vocabulary() {
    const { toast } = useToast();

    const [categories, setCategories] = useState<Category[]>([]);
    const [words, setWords] = useState<Word[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);
    const [isLoadingWords, setIsLoadingWords] = useState<boolean>(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        const url = '/api/vocabulary/categories';

        try {
             setIsLoadingCategories(true);

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setCategories(result);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error instanceof Error ? error.message : "An error occurred while fetching data",
            });
        } finally {
            setIsLoadingCategories(false)
        }
    }

    async function fetchWordsByCategory(categoryId: string) {
        const url = `/api/vocabulary/category/${categoryId}`

        try {
            if (!categoryId) {
                setIsLoadingWords(true);
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
             setWords(result);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error instanceof Error ? error.message : "An error occurred while fetching data",
            });
        } finally {
            setIsLoadingWords(false);
        }
    }

    function onClickCard(categoryId: string) {
        if (selectedCategoryId === categoryId) {
            setSelectedCategoryId(null);
            setWords([]);
        } else {
            setSelectedCategoryId(categoryId);
            fetchWordsByCategory(categoryId);
        }
    }

    return (
        <>
            <div className="flex flex-col items-center">
                <div className="flex flex-row p-3 w-full gap-[250px]">
                    <Button className="flex w-[100px]" variant={'default'} onClick={() => history.back()}>Back</Button>
                    <h1 className="flex flex-4">Vocabulary</h1>
                </div>
                {isLoadingCategories ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading categories...</p>
                        </div>
                    </div>
                ) : (
                <div className="flex flex-row flex-wrap">
                    {categories.map((cat) => (
                        <div key={cat.id}>
                            <Card
                                className="hover:shadow-lg transition-shadow cursor-pointer w-[400px] m-3"
                                onClick={() => onClickCard(cat.id)}
                            >
                                {selectedCategoryId !== cat.id &&
                                    <>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                {cat.name} words: {cat._count.words}
                                            </CardTitle>
                                            <CardDescription>
                                                {cat.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                        {   cat.icon}
                                        </CardContent>
                                    </>
                                }
                                {selectedCategoryId === cat.id &&
                                    <>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                {cat.name}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {isLoadingWords ? (
                                                <div className="flex items-center justify-center py-8">
                                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                                </div>
                                            ) : words.length > 0 ? (
                                                <ul>
                                                    {words.map((word) => (
                                                        <li key={word.id}>
                                                            <strong>{word.french}</strong> - {word.english}
                                                            <br />
                                                            <em>{word.pronunciation}</em>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>No words found</p>
                                            )}
                                        </CardContent>
                                    </>
                                }
                            </Card>
                        </div>
                    ))}
                </div>
                )}
            </div>
        </>
    )
}

export default Vocabulary;