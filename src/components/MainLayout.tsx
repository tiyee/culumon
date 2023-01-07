/** @format */
import React from 'react'
import {CssVarsProvider, extendTheme} from '@mui/joy/styles'
import {StyledEngineProvider} from '@mui/joy/styles'
type ITabKey = 'login' | 'index'
interface WrapperProps {
    tabKey: ITabKey
}

const theme = extendTheme({
    fontFamily: {
        body: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", var(--joy-fontFamily-fallback)',
        display:
            '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", var(--joy-fontFamily-fallback)',
        code: 'Menlo, Monaco, Consolas, "Andale Mono", "lucida console", "Courier New", monospace,Liberation Mono,Courier New,monospace',
        fallback: 'Helvetica, Arial, sans-serif',
    },
})

export const MainLayout = (props: React.PropsWithChildren<WrapperProps>) => {
    return (
        <StyledEngineProvider injectFirst>
            <CssVarsProvider defaultMode='system' theme={theme}>
                {props.children}
            </CssVarsProvider>
        </StyledEngineProvider>
    )
}
