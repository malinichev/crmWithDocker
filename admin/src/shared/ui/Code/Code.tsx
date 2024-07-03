import { useCallback, useEffect, useRef } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import CopyIconNew from '@/shared/assets/icons/copy.svg';
import Done from '@/shared/assets/icons/done-20-20.svg';
import cls from './Code.module.scss';
import { Icon } from '../Icon';
import { PageJson } from '@/entites/Page/model/types/pageSchema';

interface CodeProps {
    json?: PageJson;
    className?: string;
    onSend: (newJson: string) => void;
}

export const Code = (props: CodeProps) => {
    const { className, json, onSend } = props;

    const codeRef = useRef<HTMLDivElement>(null);

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(JSON.stringify(json));
    }, [json]);

    const mainDiv = codeRef?.current || document.createElement('div');

    let currentPath: String[] | [] = [];

    const getHtml = useCallback(
        (
            value: any,
            level = 0,
            // eslint-disable-next-line consistent-return
        ) => {
            Object.entries(value).forEach(([key, val]) => {
                if (level === 0) {
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    currentPath = [];
                }
                currentPath[level] = String(key);
                const keyDiv = document.createElement('div');
                keyDiv.className = classNames(cls.container, {}, ['container']);
                keyDiv.dataset.level = String(level);

                if (
                    typeof val === 'object' &&
                    !Array.isArray(val) &&
                    val !== null
                ) {
                    keyDiv.innerHTML = `<span class='key'>${key}</span>: `;
                    mainDiv.appendChild(keyDiv);
                    getHtml(val, level + 1);
                } else {
                    // 👉 formatting JSON data
                    // eslint-disable-next-line max-len
                    keyDiv.innerHTML = `<span class='key'>${key}</span>:<span contentEditable spellCheck='false' class='val' data-path='${currentPath.join('.')}'>${val}</span>`;
                    mainDiv.appendChild(keyDiv);
                }
            });
        },
        [mainDiv],
    );

    useEffect(() => {
        if (codeRef.current && json && Object.keys(json).length > 0) {
            codeRef.current.innerHTML = '';
            getHtml(json);
        }
    }, [getHtml, json]);

    const handleOnClick = useCallback(() => {
        onSend(codeRef.current?.innerHTML ?? '');
    }, [onSend]);

    return (
        <pre className={classNames(cls.CodeRedesigned, {}, [className])}>
            <Icon
                clickable
                onClick={onCopy}
                className={cls.copyBtn}
                Svg={CopyIconNew}
            />
            <Icon
                clickable
                onClick={handleOnClick}
                className={classNames(cls.copyBtn, {}, [cls.copyBtnLeft])}
                Svg={Done}
            />
            <div className={cls.CodeBlock} ref={codeRef} />
        </pre>
    );
};
