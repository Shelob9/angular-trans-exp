<?php
/**
Plugin Name: Angular Translation Experiment
 */

define( 'ANGTREX_URL', plugin_dir_url( __FILE__ ) );
define( 'ANGTREX_DIR', dirname( __FILE__ ) );
add_action( 'wp_enqueue_scripts', function(){
	wp_enqueue_script( 'angular', '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.8/angular.min.js' );
	wp_enqueue_script( 'angular-ui-router', '//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.15/angular-ui-router.min.js', [ 'angular' ] );
	wp_enqueue_script( 'angular-resource', '//ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-resource.js', [ 'angular' ] );
	wp_enqueue_script( 'angular-trans-exp', ANGTREX_URL . 'app.js', [ 'angular' ] );
	wp_localize_script('angular-trans-exp', 'ANGTREX', angtrex_vars() );
});

function angtrex_vars() {
	return [
		'api_url'            => esc_url_raw( rest_url() ),
		'partials_dir' => esc_url_raw( ANGTREX_URL . 'partials/' ),
		'rest_nonce'         => wp_create_nonce( 'rest_api' ),
		'translations'       => [
			'title'  => esc_html__( 'Title', 'angtrex' ),
			'author' => esc_html__( 'Author', 'angtrex' ),
			'view'   => esc_html__( 'Read More', 'angtrex' )
		]
	];
}


add_shortcode( 'angtrex', 'angtrex' );
function angtrex(){
	?>
	<div ng-app="angtrex">
		<a ui-sref="list">
			<?php esc_html_e( 'List', 'angtrex' ); ?>
		</a>
	</div>
	<div ui-view></div>
<?php
}
