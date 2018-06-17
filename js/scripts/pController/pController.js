/********************************/
/* Project Controller           */
/********************************/

;function PController(){
    this.projectList = [
        {
            alias: 'roovie',
            name:'Roovie',
            base_url: '',
            role: 'Design',
            file_type: 'png',
            desp: 'Build a Social Co-Watching Experience for TV Viewers'
        },
        {
            alias: 'foodvis',
            name:'Food Flow Mapper',
            base_url: '',
            role: 'Design',
            file_type: 'png',
            desp: 'Network Visualization'
        },
        {
            alias: 'aid',
            name:'Digital Depression Medication Choice Decision Aid',
            base_url: '',
            role: 'Design',
            file_type: 'png',
            desp: 'Mayo Clinic'
        },
        {
            alias: 'visualization',
            name:'Data Visualization Collection',
            base_url: '',
            role: 'Design, Front-end Development',
            file_type: 'png',
            desp: 'A Collection of Three Data Visualization Projects'
        },
        {
            alias: 'buzznow',
            name:'Buzz Now',
            base_url: '',
            role: 'Design, Front-end Development',
            file_type: 'png',
            desp: 'Groceries Delivered by your GT Neighbors'
        },
        {
            alias: 'yelp',
            name:'Yelp Business Page Redesign',
            base_url: '',
            role: 'Design',
            file_type: 'png',
            desp: 'Build a More Efficient Page'
        },
        {
            alias: 'zodiac',
            name:'Zodiac Puzzle by Leap Motion',
            base_url: '',
            role: 'Design, Front-end Development',
            file_type: 'jpg',
            desp: 'A Hand Gesture Game by Leap Motion'
        },
        {
            alias: 'tracker',
            name:'Visual Analytics of User Behavior',
            base_url: '',
            role: 'Front-end Development, Design',
            file_type: 'jpg',
            desp: 'Visual Analytics of User Behavior'
        },
        {
            alias: 'ur',
            name:'Tencent Questionnaire System',
            base_url: '',
            role: 'Front-end Development, Design',
            file_type: 'jpg',
            desp: 'Statistical Analysis in Real-Time Online'
        },
        /*{
            alias: 'tacs',
            name:'Tencent Auto Compression System',
            base_url: '',
            role: 'Design, Front-end Development',
            file_type: 'png',
            desp: 'A Code Combine & Compress Online Tool'
        },*/
        {
            alias: 'pw',
            name:"It's Me",
            base_url: '',
            role: 'Design, Front-end Development',
            file_type: 'jpg',
            desp: 'Signal-Page Personal Website with Responsive Design'
        },
        /*{
            alias: 'mobile',
            name:'Mobile Web App Collection',
            base_url: '',
            role: 'Front-end Development'
        },*/
        {
            alias: 'design',
            name:'Other Design Collection',
            base_url: '',
            role: 'Design',
            file_type: 'jpg',
            desp: 'A Collection of Print Design & Hand Drawing'
        }
    ];
}

PController.prototype = {
    constructor: PController,
    projecList: [],

    getCurrentProject: function(){
        var url = window.location.href;
        var re = /works\/(\w*)\.html/g;
        var alias = re.exec(url)[1];
        return alias;
    },

    getSiblings: function(){
        var that = this;
        var currentIndex = 0;
        var currentProject = that.getCurrentProject();

        that.projectList.forEach(function(item, index){
            if(item.alias === currentProject){
                currentIndex = index;
                return;
            }
        });

        var previousIndex = currentIndex === 0? that.projectList.length - 1 : currentIndex - 1;
        var nextIndex = currentIndex + 1 === that.projectList.length ? 0 : currentIndex + 1;

        return {
            previous: that.projectList[previousIndex],
            next: that.projectList[nextIndex]
        }
    },

    positController: function(){
        var $containerSelector = this.$pController.closest('.container');
        var containerW = $containerSelector.width();
        var winW = $(window).width();
        //var right = (winW - containerW) / 2;
        //this.$pController.css({right: right});
    },

    createController: function(selector){
        this.$pController = $(selector).length !== 0 ? $(selector) : $('.pController');
        var that = this;
        var siblings = this.getSiblings();
        var prev = siblings.previous;
        var nex = siblings.next;

        var str = '<div class="handler handler-previous">' +
            '<a href="' + prev.base_url + prev.alias + '.html" class="arrow arrow-left icon-left-open-big" data-toggle="tooltip" data-placement="top" title="' + prev.name + '"></a>' +
            '</div>' +
            '<div class="handler handler-next">' +
            '<a href="' + nex.base_url + nex.alias + '.html" class="arrow arrow-right icon-right-open-big" data-toggle="tooltip" data-placement="top" title="' + nex.name + '"></a>' +
            '</div>';

        that.$pController.html(str);
        that.positController();

        //need to use the bootstrap tooltip component
        $('[data-toggle="tooltip"]', that.$pController).tooltip();
    },

    createRelevance: function(container){
        var that = this;
        var currentIndex = 0;
        var currentProject = that.getCurrentProject();
        var projects = [];

        that.projectList.forEach(function(item, index){
            if(item.alias === currentProject){
                currentIndex = index;
                return;
            }else{
                if(projects.length < 6){
                    projects.push(item);
                }else{
                    return;
                }
            }
        });

        $(container).html(template('work/others', {list: projects}));

    }

};

