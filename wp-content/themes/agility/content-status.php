<?php
/**
 * Displays a post with format: Status
 * 
 * @package Agility
 * @since Agility 1.0
 */

global $post_index, $agilitySettings;

extract( agility_post_loop_setup() );

?>

<!-- begin content-status.php: #post-<?php the_ID(); ?> -->
<article id="post-<?php the_ID(); ?>" <?php post_class( $post_class ); ?>>
	
	<?php agility_first_item_flag( $is_latest ); ?>	
	
	<?php if ( is_search() ) : // Only display Excerpts for Search ?>
	<div class="entry-summary">
		<?php the_excerpt(); ?>
	</div><!-- .entry-summary -->
	<?php else : ?>

	<div class="entry-excerpt tagline notop-margin nobottom">

		<?php switch( $agilitySettings->op( 'blog-excerpt' ) ){

			case 'full':
				the_content( __( 'More &rarr;', 'agility' ) );
				break;

			case 'excerpt':
				the_excerpt(); ?>
				<a href="<?php the_permalink(); ?>" class="excerpt-link"><?php _e( 'More &rarr;' , 'agility' ); ?></a>
				<?php
		}
		?>

	</div><!-- .entry-excerpt -->
	<?php endif; ?>

	<!-- begin .entry-meta -->
	<footer class="entry-meta">

		<span class="five columns alpha">
			<?php if ( comments_open() || ( '0' != get_comments_number() && ! comments_open() ) ) : ?>
			<span class="post-comments tooltip-container"><a href="<?php comments_link(); ?>" class="icon icon-comments tooltip-anchor"></a><span 
				class="tooltip"><?php comments_popup_link( __( 'Leave a comment', 'agility' ), __( '1 Comment', 'agility' ), __( '% Comments', 'agility' ) ); ?></span></span>
			<?php endif; ?> 
			<span class="post-permalink tooltip-container"><?php echo agility_permalink( '', 'icon icon-link tooltip-anchor' ); ?><span class="tooltip"><?php _e( 'Permalink', 'agility' ); ?></span></span>
			<?php edit_post_link( '<i class="icon icon-pencil"></i>', '<span class="edit-link tooltip-container">', '<span class="tooltip">Edit</span></span>' ); ?>
		</span>

		<span class="six columns omega far-edge">
			<?php printf( __( 'Posted in %s', 'agility' ), agility_categories( false ) ); ?> <?php agility_posted_on(); ?> 
		</span>
		
		
	</footer>
	<!-- end #entry-meta -->
	
</article>
<!-- end content-status.php #post-<?php the_ID(); ?> -->

