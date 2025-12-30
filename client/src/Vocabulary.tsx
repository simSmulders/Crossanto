import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";

function Vocabulary() {

    type Category = {
        id: string;
        name: string;
        description: string;
        icon: string;
        createdAt: Date;
        updatedAt: Date;
    }

    type Word = {
		id: string;
		french: string;
		english: string;
		pronunciation: string;
		gender: string | null;
		categoryId: string;
		createdAt: string;
		updatedAt: string;
		category?: Category;
    }

    const [categories, setCategories] = useState<Category[]>([]);
    const [words, setWords] = useState<Word[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    useEffect(() => {
        getData('categories');
    }, []);

    async function getData(type: string, id: string | null = null) {
        let url = `/api/vocabulary/${type}`;
        if (id) {
            url = url + `/${id}`
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            if (type === 'categories') {
                setCategories(result);
            }
            if (type === 'category') {
                setWords(result);
                console.log('words', result);
            }
        } catch (error) {
            console.error(error);
        }
    }

    function onClickCard(categoryId: string) {
        if (selectedCategoryId === categoryId) {
            setSelectedCategoryId(null);
            setWords([]);
        } else {
            setSelectedCategoryId(categoryId);
            getData('category', categoryId);
        }
    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{ display: 'flex', flexDirection: 'row', padding: '12px', width: '100%', gap: '250px' }}>
                    <Button style={{ display: 'flex', width: '100px' }} variant={'default'} onClick={() => history.back()}>Back</Button>
                    <h1 style={{ display: 'flex', flex: 4 }}>Vocabulary</h1>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                    {categories.map((cat) => (
                        <div key={cat.id}>
                            <Card
                                className="hover:shadow-lg transition-shadow cursor-pointer"
                                style={{ width: '400px', margin: '12px'}}
                                onClick={() => onClickCard(cat.id)}
                            >
                                {selectedCategoryId !== cat.id &&
                                    <>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                {cat.name}
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
                                            {words.length > 0 ? (
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
                                                <p>Loading words...</p>
                                            )}
                                        </CardContent>
                                    </>
                                }
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Vocabulary;