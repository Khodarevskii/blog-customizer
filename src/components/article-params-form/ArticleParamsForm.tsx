import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { useState, useRef } from 'react';
import { Text } from 'src/ui/text';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import styles from './ArticleParamsForm.module.scss';
import { useOutsideClickClose } from '../../ui/select/hooks/useOutsideClickClose';
import {
	fontFamilyOptions,
	fontColors,
	fontSizeOptions,
	defaultArticleState,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from '../../constants/articleProps';

type ArticleParamsFormProps = {
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const [selectedFontsSize, setSelectedFontsSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [selectedFonts, setSelectedFonts] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontsColor, setSelectedFontsColor] = useState(
		defaultArticleState.fontColor
	);
	const [selectedPageBackground, setSelectedPageBackground] = useState(
		defaultArticleState.backgroundColor
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	const asideRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: asideRef,
		onChange: setIsMenuOpen,
	});

	const handleReset = () => {
		onApply({
			fontFamilyOption: defaultArticleState.fontSizeOption,
			fontSizeOption: defaultArticleState.fontFamilyOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		});
	};
	const handleApply = (event: React.FormEvent) => {
		event.preventDefault();
		onApply({
			fontFamilyOption: selectedFonts,
			fontSizeOption: selectedFontsSize,
			fontColor: selectedFontsColor,
			backgroundColor: selectedPageBackground,
			contentWidth: selectedContentWidth,
		});
	};

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => {
					setIsMenuOpen(!isMenuOpen);
				}}
			/>
			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={handleApply}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<div className={styles.fontsOptions}>
						<Select
							selected={selectedFonts}
							onChange={setSelectedFonts}
							options={fontFamilyOptions}
							title='шрифт'
						/>
						<RadioGroup
							selected={selectedFontsSize}
							name='radio'
							onChange={setSelectedFontsSize}
							options={fontSizeOptions}
							title='рАЗМЕР шрифта'
						/>
						<Select
							selected={selectedFontsColor}
							onChange={setSelectedFontsColor}
							options={fontColors}
							title='Цвет шрифта'
						/>
					</div>
					<Separator />
					<div className={styles.pageOption}>
						<Select
							selected={selectedPageBackground}
							onChange={setSelectedPageBackground}
							options={backgroundColors}
							title='Цвет фона'
						/>
						<Select
							selected={selectedContentWidth}
							onChange={setSelectedContentWidth}
							options={contentWidthArr}
							title='Ширина контента'
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />{' '}
					</div>
				</form>
			</aside>
		</>
	);
};
