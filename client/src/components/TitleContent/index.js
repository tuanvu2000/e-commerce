import React from 'react'
import clsx from 'clsx'
import styles from './TitleContent.module.scss'

const TitleContent = ({ content }) => {
    return (
        <div className={clsx(styles.title)}>
            {content}
        </div>
    )
}

export default TitleContent