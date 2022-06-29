import React, { useState } from "react";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";

const Accordion = ({ data }) => {
	const [expandedAccordionItem, setexpandedAccordionItem] = useState([0]);

	const expandOrContractAccordionItem = (index) => {
		if (expandedAccordionItem.includes(index)) {
			let newexpandedAccordionItem = [...expandedAccordionItem];
			newexpandedAccordionItem = expandedAccordionItem.filter(
				(i) => i !== index
			);
			setexpandedAccordionItem([...newexpandedAccordionItem]);
		} else {
			expandedAccordionItem.push(index);
			setexpandedAccordionItem([...expandedAccordionItem]);
		}
	};

	return (
		<div className='accordion'>
			{data.map((d, i) => {
				return (
					<div className='accordion-item' key={i}>
						<div
							className='accordion-item-title'
							onClick={() => {
								expandOrContractAccordionItem(i);
							}}
						>
							<span>
								{expandedAccordionItem.includes(i) ? (
									<FaCaretDown />
								) : (
									<FaCaretRight />
								)}
							</span>
							<h5>{d.title}</h5>
						</div>
						{expandedAccordionItem.includes(i) && (
							<div className='accordion-item-body'>{d.body}</div>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default Accordion;
