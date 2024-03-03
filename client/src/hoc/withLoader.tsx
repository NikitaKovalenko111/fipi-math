import React, { useState } from 'react'

type WrappedComponentProps = {
    isLoading: boolean
    setIsLoading: (value: boolean) => void
}

export function withLoader<P extends WrappedComponentProps>(
    WrappedComponent: React.ComponentType<P>,
    isLoadingByDefault: boolean = true
) {
    const ComponentWithLoader = (
        props: Omit<P, 'isLoading' | 'setIsLoading'>
    ) => {
        const [isLoading, setIsLoading] = useState<boolean>(isLoadingByDefault)

        return (
            <WrappedComponent
                {...(props as P)}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />
        )
    }

    return ComponentWithLoader
}
