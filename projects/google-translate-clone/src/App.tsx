import React, { useEffect, useReducer } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import type { State, Action } from './types'
import { useStore } from './hooks/useStore'
import { Container, Row, Col, Button, Form, Stack } from 'react-bootstrap'
import { ArrowsIcon } from './components/icons'

import './App.css'
import { AUTO_LANGUAGE } from './services/constants'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'
import { ClipboardIcon } from './components/icons'
import { SpeakerIcon } from './components/icons'
import { VOICE_FOR_LANGUAGE } from './services/constants'

function App() {
    const {
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading,
        interchangeLanguages,
        setFromLanguage,
        setToLanguage,
        setFromText,
        setResult,
    } = useStore()

    const debouncedFromText = useDebounce(fromText, 350)

    useEffect(() => {
        if (debouncedFromText === '') return

        translate({ fromLanguage, toLanguage, text: debouncedFromText })
            .then((result) => {
                if (result == null) return
                setResult(result)
            })
            .catch(() => {
                setResult('Error')
            })
    }, [debouncedFromText, fromLanguage, toLanguage])

    const handleClipboard = () => {
        navigator.clipboard.writeText(result).catch(() => {})
    }

    const handleSpeak = () => {
        const utterance = new SpeechSynthesisUtterance(result)
        utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
        speechSynthesis.speak(utterance)
    }

    return (
        <Container fluid>
            <h1>Google Translate</h1>

            <Row>
                <Col xs="auto">
                    <Stack gap={2}>
                        <LanguageSelector
                            type={SectionType.From}
                            value={fromLanguage}
                            onChange={setFromLanguage}
                        />
                        <TextArea
                            loading={loading}
                            value={fromText}
                            type={SectionType.From}
                            onChange={setFromText}
                        />
                    </Stack>
                </Col>
                <Col>
                    <Button
                        variant="link "
                        disabled={fromLanguage === AUTO_LANGUAGE}
                        onClick={interchangeLanguages}
                    >
                        <ArrowsIcon />
                    </Button>
                </Col>
                <Col xs="auto">
                    <Stack gap={2}>
                        <LanguageSelector
                            type={SectionType.To}
                            value={toLanguage}
                            onChange={setToLanguage}
                        />
                        <div style={{ position: 'relative' }}>
                            <TextArea
                                loading={loading}
                                type={SectionType.To}
                                value={result}
                                onChange={setResult}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    bottom: 0,
                                    display: 'flex',
                                }}
                            >
                                <Button
                                    variant="link"
                                    onClick={handleClipboard}
                                >
                                    <ClipboardIcon />
                                </Button>
                                <Button variant="link" onClick={handleSpeak}>
                                    <SpeakerIcon />
                                </Button>
                            </div>
                        </div>
                    </Stack>
                </Col>
            </Row>
        </Container>
    )
}

export default App
