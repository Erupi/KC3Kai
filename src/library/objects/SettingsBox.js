/* SettingsBox.js
KC3改 Settings Box

To be dynamically used on the settings page
*/
(function(){
	"use strict";
	
	window.SettingsBox = function( info ){
		this.config = info.id;
		this.element = $("#factory .settingBox").clone().appendTo("#wrapper .settings");
		$(".category", this.element).text( info.category );
		$(".title", this.element).text( info.name );
		this[info.type]( info.options );
	}
	
	SettingsBox.prototype.check = function( options ){
		var self = this;
		$(".options", this.element).append(
			$("<input/>")
			.attr("type", "checkbox")
			.addClass("checkbox")
			.prop("checked", ConfigManager[ this.config ])
			.on("change", function(){
				ConfigManager[ self.config ] = $(this).prop("checked");
				ConfigManager.save();
				$(this).parent().siblings(".note").stop(true, true).show().fadeOut(2000);
			})
		);
	};
	
	SettingsBox.prototype.small_text = function( options ){
		var self = this;
		$(".options", this.element).append(
			$("<input/>")
			.attr("type", "text")
			.addClass("small_text")
			.val( ConfigManager[ this.config ] )
			.on("change", function(){
				ConfigManager[ self.config ] = $(this).val();
				ConfigManager.save();
				$(this).parent().siblings(".note").stop(true, true).show().fadeOut(2000);
			})
		);
		$(".options", this.element).append( options.label );
	};
	
	
	SettingsBox.prototype.long_text = function( options ){
		var self = this;
		$(".options", this.element).append(
			$("<input/>")
			.attr("type", "text")
			.attr("placeholder", options.placeholder)
			.addClass("long_text")
			.val( ConfigManager[ this.config ] )
			.on("change", function(){
				ConfigManager[ self.config ] = $(this).val();
				ConfigManager.save();
				$(this).parent().siblings(".note").stop(true, true).show().fadeOut(2000);
			})
		);
		$(".options", this.element).append( options.label );
	};
	
	SettingsBox.prototype.radio = function( options ){
		var self = this;
		var choiceClass = "choices_" + this.config;
		for(var ctr in options.choices){
			$(".options", this.element).append(
				$("#factory .radioBox")
				.clone()
				.addClass( choiceClass )
				.addClass( (options.choices[ctr][0]==ConfigManager[ self.config ])?"active":"" )
				.data("class", choiceClass )
				.data("value", options.choices[ctr][0] )
				.html( options.choices[ctr][1] )
				.on("click", function(){
					$("."+$(this).data("class")).removeClass("active");
					$(this).addClass("active");
					ConfigManager[ self.config ] = $(this).data("value");
					ConfigManager.save();
					$(this).parent().siblings(".note").stop(true, true).show().fadeOut(2000);
				})
			);
		}
	};
	
})();