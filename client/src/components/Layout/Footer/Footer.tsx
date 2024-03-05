import { Layout, Typography } from 'antd'
import cn from 'classnames'
import styles from './../../../sass/Footer.module.sass'

const { Footer } = Layout

type PropsType = {}

const FooterComponent: React.FC<PropsType> = (): JSX.Element => {
    return (
        <Footer className={cn(styles.footer)}>
            <div className={cn(styles.container, 'container')}>
                <div>
                    <Typography.Text
                        style={{
                            fontSize: '16px',
                            color: 'white',
                        }}
                        copyable={{
                            text: 'nikitakovalenko7219@gmail.com',
                        }}
                    >
                        Почта
                    </Typography.Text>
                </div>
                <div>
                    <a
                        style={{ color: 'white' }}
                        target="__blank"
                        href="https://github.com/NikitaKovalenko111/fipi-math"
                    >
                        Github
                    </a>
                </div>
            </div>
        </Footer>
    )
}

export default FooterComponent
