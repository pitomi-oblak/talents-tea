var STTypo = new Class ({
	initialize: function(options) {
		this.wrapper = $('st-typo-wrap');
		if (!this.wrapper) return;
		this.typos = this.wrapper.getElements ('.typo');
		this.typos.addEvents ({
			'click': function (){
				console.log('hello');
				var sample = this.getElement ('.sample');
				var html = sample.innerHTML;
				window.parent.insertTypoHTML(html.trim());
				window.parent.SqueezeBox.close();		
			}
		});		
	}
});

