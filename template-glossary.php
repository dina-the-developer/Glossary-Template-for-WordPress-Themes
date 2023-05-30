<?php
/**
 * Template Name: Glossary Template
 *
 * @package theme
 */

get_header(); ?>

<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/src/css/style.css" />

<div class="page-container">
	<div class="glossary-main-header">
		<div class="container">
			<h1 class="font-white"><?php the_title(); ?></h1>
		</div>
	</div>
	<div class="glossary-contentwrapper">
		<div class="glossary-content-container">
			<div class="container">
				<h2>All Articles</h2>
				<div class="glossary-sort-by">
				  <div class="row">
				    <div class="col-sm-6">
				      <div class="sticky">
				        <h3>Search Keyword</h3>
				        <input type="text" id="text-search" class="form-control text-search" data-source="#glossario" data-alphabet="#alphabet" data-searchtitle="h3" data-offset="300" placeholder="Enter the text to search for" />
				      </div>
				    </div>
				    
				    <div class="col-sm-6">
				    	<h3>Alphabetical Order</h3>
			        <ul class="alphabet list-inline" id="alphabet">         
				      </ul>
				    </div>
				  </div>
				</div>
			  <div class="content-glossary">
				  <div class="row">
				  	<div class="col-sm-12 col-center">
					  	<div class="glossario" id="glossario">
				      	<?php
									$posts = get_posts( array(
						        'post_type' => 'glossary',
						        'post_status' => 'publish',
						        'posts_per_page' => -1,
						        'orderby' => 'title',
						        'order' => 'ASC',
					  			) );

									$alphas = range('A', 'Z');

									$letter_keyed_posts = array();

									if ( $posts ) {
									    foreach ( $posts as $post ) {
									        $first_letter = strtoupper( substr( $post->post_title, 0, 1 ) );

									        if ( ! array_key_exists( $first_letter, $letter_keyed_posts ) ) {

									            $letter_keyed_posts[ $first_letter ] = array();
									        }

									         $letter_keyed_posts[ $first_letter ][] = $post;
									    }

									}
									foreach ($letter_keyed_posts as $key => $value) {
									?>
									<h2 class="text-left"><?php echo $key; ?></h2>
									<div class="letter" id="<?php echo $key; ?>">
										<?php
										foreach ($value as $val) { 
										?>
						    			<h3><?php echo $val->post_title; ?></h3>
						    			<p><?php echo $val->post_content; ?></p>

				    				<?php } ?>

				    			</div>
				    		<?php } ?>
				      </div>
				    </div>
				  </div>
				</div>
			</div>
		</div>
	</div>
</div>

<?php get_footer(); ?>

<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/src/js/script.js"></script>