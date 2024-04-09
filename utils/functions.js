export function clickOutsideHandler(event, element, callback) {
	if(!element.contains(event.target)) {
		callback()
	}
}