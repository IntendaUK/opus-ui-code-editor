//React
import React, { useEffect } from 'react';

//System
import { createContext } from '@intenda/opus-ui';

//Plugins
import Editor from 'react-simple-code-editor';

import prism from 'prismjs';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/themes/prism.css';

//Styles
import './styles.css';

prism.manual = true;

//Context
const CodeEditorContext = createContext('codeEditor');

//Events
const onValueChange = ({ setState }, value) => setState({ value });

const onLint = ({ setState, state: { value, lint } }) => {
	if (!lint)
		return;

	let cleaned = value;
	try {
		cleaned = JSON.stringify(JSON.parse(value), null, '\t');
	} catch {}

	setState({
		value: cleaned,
		lint: false
	});
};

const onLoadValueObj = ({ setState, state: { valueObj, lint } }) => {
	if (!valueObj || lint)
		return;

	setState({
		deleteKeys: ['valueObj'],
		value: JSON.stringify(valueObj),
		lint: true
	});
};

//Export
export const CodeEditor = props => {
	const { id, getHandler, style, classNames, attributes, state } = props;
	const { value, lint, styleEditor, valueObj, language } = state;

	useEffect(getHandler(onLoadValueObj), [valueObj, lint]);

	useEffect(getHandler(onLint), [lint]);
	const handlerOnValueChange = getHandler(onValueChange);

	return (
		<CodeEditorContext.Provider value={props}>
			<div
				id={id}
				className={classNames}
				style={style}
				{...attributes}
			>
				<Editor
					value={value}
					padding={0}
					insertSpaces={false}
					tabSize={1}
					highlight={code => highlight(code, languages[language])}
					onValueChange={handlerOnValueChange}
					style={styleEditor}
				/>
			</div>
		</CodeEditorContext.Provider>
	);
};
