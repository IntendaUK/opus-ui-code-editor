//React
import React, { useLayoutEffect, useRef } from 'react';

/*
	Native replacement for react-simple-code-editor (CJS, no ESM build — its require('react')
	becomes a Rolldown __require that crashes in the browser under Vite 8). Implements the
	surface opus-ui-code-editor uses: value, onValueChange, highlight, padding, style, tabSize,
	insertSpaces. A transparent <textarea> captures input layered over a highlighted <pre>.
*/

const SHARED = {
	margin: 0,
	border: 0,
	background: 'none',
	boxSizing: 'inherit',
	display: 'inherit',
	fontFamily: 'inherit',
	fontSize: 'inherit',
	fontStyle: 'inherit',
	fontVariantLigatures: 'inherit',
	fontWeight: 'inherit',
	letterSpacing: 'inherit',
	lineHeight: 'inherit',
	tabSize: 'inherit',
	textIndent: 'inherit',
	textRendering: 'inherit',
	textTransform: 'inherit',
	whiteSpace: 'pre-wrap',
	wordBreak: 'keep-all',
	overflowWrap: 'break-word'
};

const TEXTAREA_STYLE = {
	...SHARED,
	position: 'absolute',
	top: 0,
	left: 0,
	height: '100%',
	width: '100%',
	resize: 'none',
	color: 'inherit',
	overflow: 'hidden',
	outline: 0,
	WebkitFontSmoothing: 'antialiased',
	WebkitTextFillColor: 'transparent'
};

const PRE_STYLE = {
	...SHARED,
	position: 'relative',
	pointerEvents: 'none'
};

const SimpleEditor = props => {
	const {
		value = '',
		onValueChange,
		highlight,
		padding = 0,
		style,
		tabSize = 2,
		insertSpaces = true,
		...rest
	} = props;

	const textareaRef = useRef(null);
	const preRef = useRef(null);
	const caretRef = useRef(null);

	const pad = typeof padding === 'number' ? `${padding}px` : padding;

	useLayoutEffect(() => {
		if (caretRef.current != null && textareaRef.current) {
			textareaRef.current.selectionStart = textareaRef.current.selectionEnd = caretRef.current;
			caretRef.current = null;
		}
	});

	const handleChange = e => {
		if (onValueChange)
			onValueChange(e.target.value);
	};

	const handleKeyDown = e => {
		if (e.key !== 'Tab')
			return;

		e.preventDefault();

		const { selectionStart, selectionEnd } = e.target;
		const tab = insertSpaces ? ' '.repeat(tabSize) : '\t';
		const next = value.slice(0, selectionStart) + tab + value.slice(selectionEnd);

		caretRef.current = selectionStart + tab.length;

		if (onValueChange)
			onValueChange(next);
	};

	const syncScroll = () => {
		if (preRef.current && textareaRef.current) {
			preRef.current.scrollTop = textareaRef.current.scrollTop;
			preRef.current.scrollLeft = textareaRef.current.scrollLeft;
		}
	};

	const highlighted = highlight ? highlight(value) : value;

	return (
		<div style={{ position: 'relative', overflow: 'hidden', textAlign: 'left', boxSizing: 'border-box', ...style }} {...rest}>
			<textarea
				ref={textareaRef}
				value={value}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				onScroll={syncScroll}
				style={{ ...TEXTAREA_STYLE, padding: pad }}
				spellCheck={false}
				autoCapitalize="off"
				autoComplete="off"
				autoCorrect="off"
				data-gramm="false"
			/>
			<pre
				ref={preRef}
				aria-hidden="true"
				style={{ ...PRE_STYLE, padding: pad }}
				dangerouslySetInnerHTML={{ __html: `${highlighted || ''}<br/>` }}
			/>
		</div>
	);
};

export default SimpleEditor;
