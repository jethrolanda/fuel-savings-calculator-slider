<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
global $fscs;
?>
<p <?php echo get_block_wrapper_attributes(); ?>>
	<?php //esc_html_e( 'Blocks – hello from a dynamic block!', 'blocks' ); 
	?>
	<?php $fscs->slider_shortcode->calculator_slider_shortcode(); ?>
</p>