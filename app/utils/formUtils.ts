interface FormItem {
	name: string;
	value: string;
}

interface FormItemWithCondition {
	formItem: FormItem;
	condition: boolean;
	callback?: () => void;
}

export const prepareFormData = (formItems: FormItemWithCondition[]): FormData => {
	const formData = new FormData();

	formItems.forEach(({ formItem, condition, callback }) => {
		if (condition) {
			formData.append(formItem.name, formItem.value);
			callback?.();
		}
	});

	return formData;
};
