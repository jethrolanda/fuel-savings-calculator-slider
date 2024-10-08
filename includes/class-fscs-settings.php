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
class Settings
{

    /**
     * The single instance of the class.
     *
     * @since 1.0
     */
    protected static $_instance = null;

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
     * Class constructor.
     *
     * @since 1.0.0
     */
    public function __construct()
    {
        // Add new menu
        add_action('admin_menu', array($this, 'custom_menu'), 10);

        // Fetch recaptcha setting via ajax 
        add_action("wp_ajax_fscs_settings_get_recaptcha_data", array($this, 'fscs_settings_get_recaptcha_data'));

        // Save recaptcha setting via ajax 
        add_action("wp_ajax_fscs_settings_save_recaptcha_data", array($this, 'fscs_settings_save_recaptcha_data'));

        // Fetch email setting via ajax 
        add_action("wp_ajax_fscs_settings_get_email_data", array($this, 'fscs_settings_get_email_data'));

        // Save email setting via ajax 
        add_action("wp_ajax_fscs_settings_save_email_data", array($this, 'fscs_settings_save_email_data'));

        // Send test email via ajax
        add_action("wp_ajax_fscs_settings_send_test_email", array($this, 'fscs_settings_send_test_email'));

        // Fetch and save hubspot api key 
        add_action("wp_ajax_fscs_settings_get_hubspot_api_key_data", array($this, 'fscs_settings_get_hubspot_api_key_data'));
        add_action("wp_ajax_fscs_settings_save_hubspot_api_key_data", array($this, 'fscs_settings_save_hubspot_api_key_data'));
    }

    /**
     * Add custom wp admin menu.
     * 
     * @since 1.0
     */
    public function custom_menu()
    {
        add_menu_page(
            'Fuel Savings',
            'Fuel Savings',
            'edit_posts',
            'fuel_savings_settings',
            array($this, 'fuel_savings_settings_page'),
            'dashicons-media-spreadsheet'
        );
    }

    /**
     * Display content to the new added custom wp admin menu.
     * 
     * @since 1.0
     */
    public function fuel_savings_settings_page()
    {
?>
        <div class="wrap">
            <div id="fuel-savings-settings">
                <h2>Loading...</h2>
            </div>
        </div>
<?php
    }

    /**
     * Fetch recaptcha settings.
     * 
     * @since 1.0
     */
    public function fscs_settings_get_recaptcha_data()
    {

        if (!defined('DOING_AJAX') || !DOING_AJAX) {
            wp_die();
        }

        /**
         * Verify nonce
         */
        if (isset($_POST['nonce']) && !wp_verify_nonce($_POST['nonce'], 'settings_nonce')) {
            wp_die();
        }

        try {

            $site_key = get_option('fscs_site_key', '');
            $secret_key = get_option('fscs_secret_key', '');

            wp_send_json(array(
                'status' => 'success',
                'site_key' => $site_key,
                'secret_key' => $secret_key
            ));
        } catch (\Exception $e) {

            wp_send_json(array(
                'status' => 'error',
                'message' => $e->getMessage()
            ));
        }
    }

    /**
     * Save recaptcha settings.
     * 
     * @since 1.0
     */
    public function fscs_settings_save_recaptcha_data()
    {

        if (!defined('DOING_AJAX') || !DOING_AJAX) {
            wp_die();
        }

        /**
         * Verify nonce
         */
        if (isset($_POST['nonce']) && !wp_verify_nonce($_POST['nonce'], 'settings_nonce')) {
            wp_die();
        }

        try {

            $site_key = isset($_POST['site_key']) ? sanitize_text_field($_POST['site_key']) : '';
            $secret_key = isset($_POST['secret_key']) ? sanitize_text_field($_POST['secret_key']) : '';

            update_option('fscs_site_key', $site_key);
            update_option('fscs_secret_key', $secret_key);

            wp_send_json(array(
                'status' => 'success',
                'site_key' => $site_key,
                'secret_key' => $secret_key
            ));
        } catch (\Exception $e) {

            wp_send_json(array(
                'status' => 'error',
                'message' => $e->getMessage()
            ));
        }
    }

    /**
     * Fetch email settings.
     * 
     * @since 1.0
     */
    public function fscs_settings_get_email_data()
    {

        if (!defined('DOING_AJAX') || !DOING_AJAX) {
            wp_die();
        }

        /**
         * Verify nonce
         */
        if (isset($_POST['nonce']) && !wp_verify_nonce($_POST['nonce'], 'settings_nonce')) {
            wp_die();
        }

        try {

            $redirect_url = get_option('fscs_modal_redirect_url', '');
            $subject = get_option('fscs_email_subject', '');
            $cc = get_option('fscs_email_cc', '');
            $bcc = get_option('fscs_email_bcc', '');
            $body = get_option('fscs_email_body', '');

            wp_send_json(array(
                'status' => 'success',
                'redirect_url' => $redirect_url,
                'subject' => $subject,
                'cc' => $cc,
                'bcc' => $bcc,
                'body' => wp_unslash($body)
            ));
        } catch (\Exception $e) {

            wp_send_json(array(
                'status' => 'error',
                'message' => $e->getMessage()
            ));
        }
    }

    /**
     * Save email settings.
     * 
     * @since 1.0
     */
    public function fscs_settings_save_email_data()
    {

        if (!defined('DOING_AJAX') || !DOING_AJAX) {
            wp_die();
        }

        /**
         * Verify nonce
         */
        if (isset($_POST['nonce']) && !wp_verify_nonce($_POST['nonce'], 'settings_nonce')) {
            wp_die();
        }

        try {

            $redirect_url = isset($_POST['modal_redirect_url']) ? esc_url_raw($_POST['modal_redirect_url']) : '';

            $subject = isset($_POST['subject']) ? sanitize_text_field($_POST['subject']) : '';
            $cc = isset($_POST['cc_emails']) ? $_POST['cc_emails'] : '';
            $bcc = isset($_POST['bcc_emails']) ? $_POST['bcc_emails'] : '';

            $allowed_tags = array(
                'a' => array(
                    'href' => array(),
                    'title' => array()
                ),
                'p' => array(
                    'class' => array()
                ),
                'br' => array(),
                'ul' => array(),
                'ol' => array(),
                'li' => array(),
                'i' => array(),
                'b' => array(),
                'u' => array(),
                'h1' => array(),
                'h2' => array(),
                's' => array(),
                'blockquote' => array()
            );
            $body = isset($_POST['body']) ? wp_kses_post($_POST['body'], $allowed_tags) : '';
            $body = str_replace("\t", '&nbsp;&nbsp;&nbsp;&nbsp;', $body);

            update_option('fscs_modal_redirect_url', $redirect_url);
            update_option('fscs_email_subject', $subject);
            update_option('fscs_email_cc', $cc);
            update_option('fscs_email_bcc', $bcc);
            update_option('fscs_email_body', $body);

            wp_send_json(array(
                'status' => 'success',
                'redirect_url' => $redirect_url,
                'subject' => $subject,
                'cc' => $cc,
                'bcc' => $bcc,
                'body' => wp_unslash($body)
            ));
        } catch (\Exception $e) {

            wp_send_json(array(
                'status' => 'error',
                'message' => $e->getMessage()
            ));
        }
    }

    /**
     * Send a test email.
     * 
     * @since 1.0
     */
    public function fscs_settings_send_test_email()
    {

        if (!defined('DOING_AJAX') || !DOING_AJAX) {
            wp_die();
        }

        /**
         * Verify nonce
         */
        if (isset($_POST['nonce']) && !wp_verify_nonce($_POST['nonce'], 'settings_nonce')) {
            wp_die();
        }

        try {

            add_filter('fscs_bypass_generate_pdf_security', '__return_true');
            add_filter('fscs_bypass_recaptcha_security', '__return_true');
            add_filter('fscs_send_test_email', '__return_true');

            $email = isset($_POST['email']) ? sanitize_email($_POST['email']) : '';

            $test_data = array(
                'name' => 'John Doe',
                'email' => $email,
                'calculator_data' => array(
                    'number_of_operators' => '2',
                    'number_of_units_in_fleet' => '17',
                    'frequency_of_fueling' => '6',
                    'round_trip_per_fueling' => '39',
                    'estimated_gallons_per_fill' => '29',
                    'average_hourly_rate' => '24',
                    'every_gallon_you_pump_cost_an' => '$0.25',
                    'estimated_gallons_consumed_per_week' => '1,831.14',
                    'man_hours_allocated_to_fueling_per_week' => '133',
                    'lost_asset_production_hours_per_week' => '12,951',
                    'estimated_cost_of_self_fueling_per_week' => '$3,182',
                    'yearly_fuel_savings' => '$165,485'
                )
            );

            $_POST = $test_data;
            global $fscs;
            $fscs->_fscs_generate_pdf_report->fscs_generate_pdf();

            wp_send_json(array(
                'status' => 'success',
            ));
        } catch (\Exception $e) {

            wp_send_json(array(
                'status' => 'error',
                'message' => $e->getMessage()
            ));
        }
    }
    /**
     * Save hubspot settings.
     * 
     * @since 1.0
     */
    public function fscs_settings_get_hubspot_api_key_data()
    {
        if (!defined('DOING_AJAX') || !DOING_AJAX) {
            wp_die();
        }

        /**
         * Verify nonce
         */
        if (isset($_POST['nonce']) && !wp_verify_nonce($_POST['nonce'], 'settings_nonce')) {
            wp_die();
        }

        try {

            $api_key = get_option('fscs_huspot_api_key', '');

            wp_send_json(array(
                'status' => 'success',
                'api_key' => $api_key
            ));
        } catch (\Exception $e) {

            wp_send_json(array(
                'status' => 'error',
                'message' => $e->getMessage()
            ));
        }
    }

    /**
     * Save hubspot settings.
     * 
     * @since 1.0
     */
    public function fscs_settings_save_hubspot_api_key_data()
    {

        if (!defined('DOING_AJAX') || !DOING_AJAX) {
            wp_die();
        }

        /**
         * Verify nonce
         */
        if (isset($_POST['nonce']) && !wp_verify_nonce($_POST['nonce'], 'settings_nonce')) {
            wp_die();
        }

        try {

            $api_key = isset($_POST['api_key']) ? sanitize_text_field($_POST['api_key']) : '';

            update_option('fscs_huspot_api_key', $api_key);

            wp_send_json(array(
                'status' => 'success',
                'api_key' => $api_key
            ));
        } catch (\Exception $e) {

            wp_send_json(array(
                'status' => 'error',
                'message' => $e->getMessage()
            ));
        }
    }
}
