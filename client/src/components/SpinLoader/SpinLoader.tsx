import { Spin } from 'antd'

type PropsType = {
    style?: React.CSSProperties
    size?: 'default' | 'large' | 'small'
}

const SpinLoader: React.FC<PropsType> = ({ style, size }): JSX.Element => {
    return (
        <Spin
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                ...style,
            }}
            size={size}
            spinning={true}
        ></Spin>
    )
}

export default SpinLoader
