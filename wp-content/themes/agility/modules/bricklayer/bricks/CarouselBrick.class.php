<?php
/**
 * BrickLayer Brick: Slider
 *
 * Displays a slider
 *
 */


class CarouselBrick extends Brick{

	function __construct( $brick_id = -1 ){

		parent::__construct( 'Carousel' , __( 'Carousel', 'agility' ) , $brick_id );

		$this->addSetting( new BrickSetting( 'details', __( 'This brick will display any slider that you have created with the SliderConstructor in a Carousel. ', 'agility' ),
			'info', '', $this->id , $this->brick_id ) );

		$this->addSetting( new BrickSetting( 'title', __( 'Title', 'agility' ), 'text', '', $this->id, $this->brick_id , 
			array( 'desc' => __( 'The title is optional and will be displayed above the carousel', 'agility' ) ) ) );

		$sq_config = array(
			'ops'	=> agility_slider_ops(),
			'desc'	=> __( 'Choose from sliders you have created', 'agility' ).' or <a href="'.
						admin_url('admin.php?page=sliderconstructor'). '" target="_blank">create a new slider</a> with the SliderConstructor'
		);
		$this->addSetting( new BrickSetting( 'slider_query_id', __( 'Slider', 'agility' ), 
			'select', '', $this->id , $this->brick_id , $sq_config ) );

		$this->addSetting( new BrickSetting( 'crop_feature', __( 'Crop slides', 'agility' ), 
			'checkbox', '', $this->id , $this->brick_id , array( 'default' => 'off', 'prefix' => '', 'desc' => __( 'Crop carousel images to the aspect ratio defined in the Agility Control Panel', 'agility' ) ) ) );

	}

	public function draw( $container_cols, $columns = '' ){

		$this->before( $columns );

		if( $this->getSetting( 'title' ) ): ?>

		<h3 class="brick-title"><?php echo $this->getSetting( 'title' ); ?></h3>

		<?php endif;
		
		
		//Slider Query
		$slider_query_id 	= $this->getSetting( 'slider_query_id' );

		$brick_grid_columns = $this->getSetting( '_grid_columns' );
		$pixel_width = agility_max_pixel_width( $brick_grid_columns );

		$carousel_img_size = 'natural_640';
		if( $this->getSetting( 'crop_feature' ) ) $carousel_img_size = 'crop_640';

		agility_item_carousel( $slider_query_id  , 'slider_id', $carousel_img_size );

		//agility_slider( $slider_query_id , 'slider_id', agility_image_size( $this->brick_id , $pixel_width ) );

		$this->after();
	}


}
