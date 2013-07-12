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
  
  def show
    render json: {
      'big_object_view' => {
        'title' => 'Graph',
          'measurement' => 'Revenue',
          'dimensions' => ['dimension-a', 'dimension-b', 'dimension-c']
      }
    }
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
        { name: 'CAT-A', sub_dimensions: ['a', 'b', 'c', 'd']}, 
        { name: 'CAT-B', sub_dimensions: ['d', 'e', 'f', 'g', 'h', 'i', 'j']}, 
        { name: 'CAT-C', sub_dimensions: ['k', 'l', 'm']}
      ],
      'measures' => ['Revenue', 'Cost', 'Sales']
    }
  end

end