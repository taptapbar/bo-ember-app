class BigObjectViewsController < ApplicationController
  def index
    render json: {
      'big_object_views' => [
        { 
          'id' => '1',
          'title' => 'Graph',
          'measure' => 'Revenue',
          'dimensions' => ['dimension-a', 'dimension-b', 'dimension-c']
        },
        { 
          'id' => '2',
          'title' => 'Graph 2',
          'measure' => 'Revenue',
          'dimensions' => ['dimension-a', 'dimension-b']
        },
        { 
          'id' => '3',
          'title' => 'Graph 3',
          'measure' => 'Revenue',
          'dimensions' => ['dimension-a']
        },
        { 
          'id' => '4',
          'title' => 'Graph 4',
          'measure' => 'Revenue',
          'dimensions' => ['dimension-a', 'dimension-b', 'dimension-c']
        },
        { 
          'id' => '5',
          'title' => 'Graph 5',
          'measure' => 'Revenue',
          'dimensions' => ['dimension-a', 'dimension-b']
        }
      ]
    }
  end
  
  def create
    if ['1', '2', '3', '4', '5'].include? params['big_object_view']['id']
      render json: nil, status: :unprocessable_entity
    else    
      render json: nil, status: :ok
    end
  end
  
  def show
    request_id = params['id']
    if ['1', '2', '3', '4', '5'].include? request_id
      render json: {
        'big_object_view' => {
          'id'    => request_id,
          'title' => "Graph #{request_id}",
            'measurement' => 'Revenue',
            'dimensions' => ['dimension-a', 'dimension-b', 'dimension-c']
        }
      }
    else
      render json: nil, status: :unprocessable_entity
    end
  end
  
  def update
    render json: nil, status: :ok
  end

  def destroy
    render json: nil, status: :ok
  end

  def new_id
    render json: nil, status: :ok
  end

  def dimensions_and_measures
    render json: {
      #'dimensions' => {
      #  'CAT-A' => ['a', 'b', 'c', 'd'], 
      #  'CAT-B' => ['d', 'e', 'f', 'g', 'h', 'i', 'j'], 
      #  'CAT-C' => ['k', 'l', 'm']
      #},
      'dimensions' => [
        { name: 'CAT-A', sub_dimensions: ['Age', 'Gender', 'Income']}, 
        { name: 'CAT-B', sub_dimensions: ['Continent', 'Region', 'Country']}, 
        #{ name: 'CAT-C', sub_dimensions: ['k', 'l', 'm']}
      ],
      'measures' => ['Revenue', 'Cost', 'Sales']
    }
  end

  def filter_list
    render json: {
      'filter_list' => [
        { name: 'Dimension-A', sub_filters: ['sub-a', 'sub-b', 'sub-c', 'sub-d', 'sub-e',]},
        { name: 'Dimension-A', sub_filters: ['sub-a', 'sub-b', 'sub-c', 'sub-d', 'sub-e', 'sub-f', 'sub-g', 'sub-h', 'sub-i', 'sub-j', 'sub-k', 'sub-l', 'sub-m', 'sub-n', 'sub-o']},
        { name: 'Dimension-A', sub_filters: ['sub-a', 'sub-b', 'sub-c', 'sub-d']}        
      ],
      'id' => params[:id]
    }
  end

end