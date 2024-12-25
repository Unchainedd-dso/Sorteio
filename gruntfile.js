module.exports = function(grunt){

    // configuração do projeto
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            // Ambiente de desenvolvimento
            development: {
                options:{
                    // Cria um sourcemap para ele
                    sourceMap: true
                },
                files: {
                    // <arquivo de destino>: <arquivo de origem>
                    './dev/styles/main.css': './source/styles/main.less'
                }
            },
            // Ambiente de produção -> produto pronto
            production:{
                options: {
                    // minifica o arquivo
                    compress: true,
                    // Optimiza o codigo, entre os niveis 0 a 2
                    optimization: 2,
                },
                files:{
                    './dist/styles/main.min.css': './source/styles/main.less'
                }
            }
        },
        concurrent:{
            target: ['less:development']
        },
        watch:{
            less:{
                files: ['./source/styles/**/*.less', './source/index.html'],
                tasks:['less:development','replace:development', 'htmlmin:development']
            }
        },
        // Esse script procura pela string 'ENDERECO_DO_CSS, 
        // no arquivo './source/index.html,
        // substitui pela string './styles/main.css'
        // e salva na pasta './dev'
        replace:{
            development:{
                options:{
                    patterns:[
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css',
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../source/scripts/main.js',
                        }
                    ]
                },
                files:[
                    {
                        // Com o expando sendo igual a true, podemos encontrar os arquivos de origem
                        // de forma mais flexivel, como por exemplo './source/**/*.css */
                        expand:true,
                        // Com o flatten sendo true, ele salvara apenas o arquivo de origem na pasta de destino,
                        // sem manter a estrutura de subdiretorios
                        // ex: ./src/pages/about.html -> ./dest/pages/about.html <-> false
                        //  ./src/pages/about.html -> ./dest/about.html <-> true
                        flatten: true,
                        src:['./source/index.html'],
                        dest:'./dev',
                    }
                ]
            },
            production:{
                options:{
                    patterns:[
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css',
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './scripts/main.min.js',
                        }
                    ]
                },
                files:[
                    {
                        // Com o expando sendo igual a true, podemos encontrar os arquivos de origem
                        // de forma mais flexivel, como por exemplo './source/**/*.css */
                        expand:true,
                        // Com o flatten sendo true, ele salvara apenas o arquivo de origem na pasta de destino,
                        // sem manter a estrutura de subdiretorios
                        // ex: ./src/pages/about.html -> ./dest/pages/about.html <-> false
                        //  ./src/pages/about.html -> ./dest/about.html <-> true
                        flatten: true,
                        src:['./dist/index.html'],
                        dest:'./dist',
                    }
                ]
            }
        },
        htmlmin:{
            development:{
                option:{
                    removeComents:true,
                    minifyJS: true,
                    minifyCSS: true,
                },
                files:[
                    {
                        expand: true,
                        flatten: true,
                        src: ['./dev/*.html'],
                        dest: './dev'       
                    }
                ]
            },
            production:{
                options:{
                    removeComents: true,
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true,
                },
                files:[
                    {
                        expand: true,
                        flatten: true,
                        src: ['./source/*.html'],
                        dest: './dist'
                    }
                ]
            }
        },
        uglify:{
            target:{
                files:[
                    {
                        expand: true,
                        flatten: true,
                        src: ['./source/scripts/*.js'],
                        dest:'./dist/scripts/',
                        ext: '.min.js' //extensão do arquivo gerado 
                    }  
                ]
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-concurrent')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-replace')
    grunt.loadNpmTasks('grunt-contrib-htmlmin')
    grunt.loadNpmTasks('grunt-contrib-uglify')

    grunt.registerTask('default', ['watch'])
    grunt.registerTask('build', ['less:production', 'htmlmin:production', 'replace:production', 'uglify'])
    grunt.registerTask('change', ['replace'])

}

// grunt.registerTask('olaGrunt', function(){
//     const done = this.async();
//     setTimeout(function(){
//         console.log("Oi Grunt");
//         done();
//     }, 3000)    
// })

// grunt.registerTask('tarefaMediaDuracao', function(){
//     const done = this.async();
//     setTimeout(function(){
//         console.log("Hi-Ho Grunt");
//         done();
//     }, 2000)    
// })