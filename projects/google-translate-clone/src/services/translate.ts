//NO PUBLIQUES ESTO O SE EXPONDRA LA APIKEY DE OPENAI
//ESTO LO HACEMOS PORQUE NOS ESTAMOS ENFOCANDO EN REACT

import OpenAI from 'openai'

import type { FromLanguage, Language } from '../types'
import { SUPPORTED_LANGUAGES } from './constants'

const apikey = import.meta.env.VITE_OPENAI_API_KEY

const openai = new OpenAI({
    apiKey: apikey, // ¡OJO! no pongas la clave directamente
    dangerouslyAllowBrowser: true, // ⚠️ Necesario para usar en navegador (no recomendado en prod)
})

export async function translate({
    fromLanguage,
    toLanguage,
    text,
}: {
    fromLanguage: FromLanguage
    toLanguage: Language
    text: string
}) {
    if (fromLanguage === toLanguage) return text

    const messages = [
        {
            role: 'system',
            content:
                'You are an AI that translates text. You receive a text from the user. Do not answer, just translate the text. The original language is surrounded by `{{`` and `}}`. You can also receive {{auto}} which means that you have todetect the language. The language you translate to is surroanded by `[[` and `]]`',
        },
        {
            role: 'user',
            content: 'Hola mundo {{Español}} [[English]]',
        },
        {
            role: 'assistant',
            content: 'Hello world',
        },
        {
            role: 'user',
            content: 'How are you? {{auto}} [[Deutsch]]',
        },
        {
            role: 'assistant',
            content: 'wie geht es dir?',
        },
        {
            role: 'user',
            content: 'Bon dia, como estas? {{auto}} [[English]]',
        },
        {
            role: 'assistant',
            content: 'Buenod días, ¿cómo estás?',
        },
    ]

    const fromCode =
        fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
    const toCode = SUPPORTED_LANGUAGES[toLanguage]

    // const completion = await openai.chat.completions.create({
    //     model: 'gpt-3.5-turbo',
    //     messages: [
    //         ...messages,
    //         {
    //             role: 'user',
    //             content: `${text} {{${fromCode}}} [[${toCode}]]`,
    //         },
    //     ],
    // })

    // try {
    //     const completion = await openai.chat.completions.create({
    //         model: 'gpt-3.5-turbo',
    //         messages: [
    //             ...messages,
    //             {
    //                 role: 'user',
    //                 content: `${text} {{${fromCode}}} [[${toCode}]]`,
    //             },
    //         ],
    //     })
    //     console.log('Respuesta de OpenAI:', completion)
    // } catch (error: any) {
    //     console.error('Error al llamar a OpenAI:')
    //     console.error('Código:', error.status)
    //     console.error('Mensaje:', error.message)
    //     console.error('Detalles:', JSON.stringify(error, null, 2))
    // }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apikey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                ...messages,
                {
                    role: 'user',
                    content: `${text} {{${fromCode}}} [[${toCode}]]`,
                },
            ],
        }),
    })

    const data = await response.json()
    console.log('Respuesta:', data)

    //return completion.choices[0]?.message?.content
    return data
}
