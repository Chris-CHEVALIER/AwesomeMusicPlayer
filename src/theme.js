const color = {
    primary: "#FAAE31",
    primaryTap: "#3cb7dd",
    secondary: "#FAAE31",
    danger: "#f04134",
    warning: "#ec1c23",
    success: "#29b55c",
    info: "#287fb5",
    important: "#fddb20",
    black: "#1e2942",
    white: "#fdfdfd",
    darkGray: "#505050",
    mediumGray: "#a5a5a5",
    lightGray: "#d0d0d0"
};

module.exports = {
    menu_background: "#FAAE31",

    color_text_base: color.black,
    color_text_base_inverse: color.white,
    fill_base: color.white,
    fill_tap: color.lightGray,
    fill_disabled: color.lightGray,

    brand_primary: color.primary,
    brand_primary_tap: color.primaryTap,
    brand_secondary: color.secondary,
    brand_success: color.success,
    brand_warning: color.warning,
    brand_error: color.danger,
    brand_important: color.important,

    border_color_base: color.primary,

    primary_button_fill: color.primary,
    primary_button_fill_tap: color.primaryTap,
    ghost_button_color: color.primary,
    ghost_button_fill_tap: color.primaryTap,
    link_button_fill_tap: color.lightGray,

    input_color_icon_tap: color.primary,
    tabs_color: color.primary,
    segmented_control_color: color.primary,
    segmented_control_fill_tap: `${color.primary}10`
};
