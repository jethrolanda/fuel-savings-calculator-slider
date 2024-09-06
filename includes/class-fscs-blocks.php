<?php

namespace FSCS\Plugin;

/**
 * Plugins custom settings page that adheres to wp standard
 * see: https://developer.wordpress.org/plugins/settings/custom-settings-page/
 *
 * @since   1.0
 */

defined('ABSPATH') || exit;

/**
 * WP Settings Class.
 */
class Blocks
{
  /**
   * The single instance of the class.
   *
   * @since 1.0
   */
  protected static $_instance = null;

  /**
   * Class constructor.
   *
   * @since 1.0.0
   */
  public function __construct()
  {
    add_action('init', array($this, 'create_block_blocks_block_init'));
  }

  /**
   * Main Instance.
   * 
   * @since 1.0
   */
  public static function instance()
  {
    if (is_null(self::$_instance)) {
      self::$_instance = new self();
    }
    return self::$_instance;
  }
  /**
   * Registers the block using the metadata loaded from the `block.json` file.
   * Behind the scenes, it registers also all assets so they can be enqueued
   * through the block editor in the corresponding context.
   *
   * @see https://developer.wordpress.org/reference/functions/register_block_type/
   */
  public function create_block_blocks_block_init()
  {
    register_block_type(FSCS_BLOCKS_ROOT_DIR . 'build/fuel_savings_calculator_slider');
    register_block_type(FSCS_BLOCKS_ROOT_DIR . 'build/fuel_savings_pdf_report');
    register_block_type(FSCS_BLOCKS_ROOT_DIR . 'build/fuel_savings_pdf_report_for_salesperson');

    add_filter('block_categories_all', function ($categories) {

      // Adding a new category.
      $categories[] = array(
        'slug'  => 'fuel-savings-calculator-slider-blocks',
        'title' => 'Fuel Savings Calculator Slider'
      );

      return $categories;
    });
  }
}
