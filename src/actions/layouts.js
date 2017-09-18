export const toggleLayoutEdit = () => {
  return {
    type: 'LAYOUTS_EDIT_TOGGLE',
  }
}

export const updateLayouts = (layouts) => {
  return {
    type: 'LAYOUTS_UPDATE',
    layouts  
  }
}
